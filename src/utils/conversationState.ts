// Conversation state and metrics utilities for Enhanced Conversational Logic
import type { Message } from '../types';

export type ConversationPhase = 1 | 2 | 3 | 4 | 5;

export type PersonalityProfile =
  | 'shy'
  | 'dominant'
  | 'analytical'
  | 'emotional'
  | 'guarded'
  | 'unknown';

export interface ConversationMetrics {
  userUtteranceCount: number;
  aiUtteranceCount: number;
  userChars: number;
  aiChars: number;
  callbacksUsed: number;
  thatsRightMoments: number;
  laughterCount: number;
  vulnerabilityExchanges: number;
  lastCallbackTime?: number;
}

export interface ConversationStateSnapshot {
  phase: ConversationPhase;
  elapsedMinutes: number;
  depthLevel: 1 | 2 | 3 | 4;
  userTalkRatio: number; // 0-1
  metrics: ConversationMetrics;
  personality: PersonalityProfile;
  recentShortAnswers: boolean;
  recentLowEnergy: boolean;
  recentGuardedResponses: boolean;
}

export function createInitialMetrics(): ConversationMetrics {
  return {
    userUtteranceCount: 0,
    aiUtteranceCount: 0,
    userChars: 0,
    aiChars: 0,
    callbacksUsed: 0,
    thatsRightMoments: 0,
    laughterCount: 0,
    vulnerabilityExchanges: 0,
  };
}

export function getPhaseFromElapsedMinutes(elapsedMs: number): ConversationPhase {
  const minutes = elapsedMs / 60000;
  if (minutes < 5) return 1;
  if (minutes < 12) return 2;
  if (minutes < 22) return 3;
  if (minutes < 30) return 4;
  return 5;
}

export function estimateUserTalkRatio(metrics: ConversationMetrics): number {
  const totalChars = metrics.userChars + metrics.aiChars;
  if (!totalChars) return 0.6; // default target
  return metrics.userChars / totalChars;
}

export function inferDepthLevelFromHistory(history: Message[]): 1 | 2 | 3 | 4 {
  const lastAi = [...history].reverse().find((m) => m.speaker === 'ai');
  if (!lastAi) return 1;
  const text = lastAi.text.toLowerCase();
  if (
    text.includes('perfect version') ||
    text.includes('if you could') ||
    text.includes('wake up anywhere')
  )
    return 4;
  if (text.includes('what does that give you') || text.includes('matters most') || text.includes('value'))
    return 3;
  if (text.includes('feel') || text.includes('love about')) return 2;
  return 1;
}

export function inferPersonalityProfileFromHistory(history: Message[]): PersonalityProfile {
  const userMessages = history.filter((m) => m.speaker === 'user');
  if (!userMessages.length) return 'unknown';

  const joined = userMessages.map((m) => m.text.toLowerCase()).join(' ');
  const avgLen = joined.length / userMessages.length;

  if (joined.includes('idk') || joined.includes("i don't know")) return 'shy';
  if (joined.includes('honestly') || joined.includes('to be honest')) return 'emotional';
  if (joined.includes('logic') || joined.includes('rational') || joined.includes('analyze'))
    return 'analytical';
  if (joined.includes("i'm always right") || joined.includes('obviously')) return 'dominant';
  if (joined.includes("i don't usually share") || joined.includes('hard to trust')) return 'guarded';

  if (avgLen < 15) return 'shy';
  if (avgLen > 80) return 'analytical';

  return 'unknown';
}

export function updateMetrics(
  prev: ConversationMetrics,
  newMessage: Message,
  now: number,
  history: Message[],
): ConversationMetrics {
  const next: ConversationMetrics = { ...prev };
  const len = newMessage.text.length;

  if (newMessage.speaker === 'user') {
    next.userUtteranceCount += 1;
    next.userChars += len;

    const lower = newMessage.text.toLowerCase();
    if (lower.includes('haha') || lower.includes('lol') || lower.includes('lmao')) {
      next.laughterCount += 1;
    }
    if (lower.includes("that's right") || lower.includes('thats right')) {
      next.thatsRightMoments += 1;
    }
    if (
      lower.includes('embarrassing') ||
      lower.includes('vulnerable') ||
      lower.includes("i've never told")
    ) {
      next.vulnerabilityExchanges += 1;
    }
  } else {
    next.aiUtteranceCount += 1;
    next.aiChars += len;

    const lower = newMessage.text.toLowerCase();
    if (
      lower.includes('going back to') ||
      lower.includes('like you said') ||
      lower.includes('earlier you mentioned')
    ) {
      next.callbacksUsed += 1;
      next.lastCallbackTime = now;
    }
  }

  return next;
}

export function buildConversationStateSnapshot(
  sessionStartTime: number | null,
  metrics: ConversationMetrics,
  history: Message[],
): ConversationStateSnapshot {
  const now = Date.now();
  const elapsedMs = sessionStartTime ? now - sessionStartTime : 0;
  const phase = getPhaseFromElapsedMinutes(elapsedMs);
  const depthLevel = inferDepthLevelFromHistory(history);
  const userTalkRatio = estimateUserTalkRatio(metrics);
  const personality = inferPersonalityProfileFromHistory(history);

  const recentMessages = history.slice(-5).filter((m) => m.speaker === 'user');
  const recentShortAnswers = recentMessages.some(
    (m) => m.text.trim().length > 0 && m.text.trim().length < 15,
  );
  const recentLowEnergy = recentMessages.some((m) =>
    /i guess|whatever|fine|idk|tired/i.test(m.text),
  );
  const recentGuardedResponses = recentMessages.some((m) =>
    /i don't want to talk|rather not|not comfortable/i.test(m.text),
  );

  return {
    phase,
    elapsedMinutes: elapsedMs / 60000,
    depthLevel,
    userTalkRatio,
    metrics,
    personality,
    recentShortAnswers,
    recentLowEnergy,
    recentGuardedResponses,
  };
}