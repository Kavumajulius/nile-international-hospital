Introduction
Getting started
Get your API keys and start making requests

​
Use cases
Our API provides a powerful way to interact with whop programmatically. Some common use cases include
I’m a company owner and I want to pull payments made only to my company.
-> Use Company API keys
I’m a developer and I want to list memberships for any company that has installed my app.
-> Use App API keys
I’m a developer using whop for platforms I want to retrieve payment details for payments made to a connected account of my platform.
-> Use Company API keys of the main “platform” company.
Access to different features of our api is controlled by a fine-grained permission system, allowing you to implement strong security practices in your applications. Always make sure your api key has the required permissions enabled for your desired usage. Each endpoint will document the required permission scopes.
​
Company API keys
Use company api keys when you only want to fetch data, or perform actions for your own company, and or connected account companies.
Go to your developer dashboard.
Click the “Create” button in the “Company API Keys” section
Give your api key a name. For example “Data pipeline” or “GHL Integration”
Select a role or a custom set of permissions. (You can always update this later and add more if you need)
Create the api key, and copy it from the modal.
​
App API keys
Use app api keys when you are building an app and need to access data on companies that have installed your app.
Go to your developer dashboard.
Click the Create app button and give your app a name. You can change this name later.
Your API key is the hidden text after WHOP_API_KEY in the Environment variables section.
Use the reveal button to show the key, copy it and keep it in a safe place.
You will need it to make API calls.
​
Making API calls
Our public api is available at https://api.whop.com/api/v1
You can test the api by using curl to fetch your public user profile data:
# replace "j" with your own whop username
curl https://api.whop.com/api/v1/users/j
To make authenticated requests you need to include your API key in the Authorization header using the Bearer scheme:
# replace "YOUR_API_KEY" with your real API key
curl https://api.whop.com/api/v1/payments?company_id=biz_xxxxxxxxxxx \
    -H "Authorization: Bearer YOUR_API_KEY"
​
Whop SDKs
We recommending using our SDKs to make API calls in your apps. We currently support
Typescript / Javascript / Docs
pnpm install @whop/sdk
Python / Docs
pip install whop-sdk
Ruby / Docs
gem install whop_sdk
​
Example usage
Make sure your api key has the required permissions to make api calls. If building an app, see Permissions for more information.

Typescript

Python

Ruby
import Whop from "@whop/sdk";

const client = new Whop({
  apiKey: process.env["WHOP_API_KEY"], // This is the default and can be omitted
  appID: "app_xxxxxxxxxxxxxx", // only required when building an app
});

const page = await client.payments.list({ company_id: "biz_xxxxxxxxxxxxxx" });
const paymentListResponse = page.data[0];

console.log(paymentListResponse.id);
​
MCP
You can also access the API via our mcp server available at https://mcp.whop.com/mcp (cursor) or https://mcp.whop.com/sse (claude)
Learn more here


GET PRODUCTS 
Products
List products
Lists products for a company

Required permissions:

access_pass:basic:read
GET
/
products

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Query Parameters
​
after
string | null
Returns the elements in the list that come after the specified cursor.

​
before
string | null
Returns the elements in the list that come before the specified cursor.

​
first
integer | null
Returns the first n elements from the list.

Example:
42

​
last
integer | null
Returns the last n elements from the list.

Example:
42

​
company_id
stringrequired
The ID of the company to filter products by

Example:
"biz_xxxxxxxxxxxxxx"

​
product_types
enum<string>[] | null
The type of products to filter by

The different types an product can be. Only use 'regular'. The rest are for internal use

Available options: regular, app, experience_upsell, api_only 
​
visibilities
enum<string>[] | null
The visibility of the products to filter by

The different levels of visibility for resources

Available options: visible, hidden, archived, quick_link, all, not_quick_link, not_archived 
​
order
enum<string> | null
The order of the products

Available options: active_memberships_count, created_at, usd_gmv, usd_gmv_30_days 
​
direction
enum<string> | null
The direction of the order

Available options: asc, desc 
​
created_before
string<date-time> | null
The maximum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

​
created_after
string<date-time> | null
The minimum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

Response

200

application/json
A successful response

The connection type for PublicAccessPass.

​
data
object[]required
A list of nodes.

Show child attributes

​
page_info
objectrequired
Information to aid in pagination.

Show child attributes

import Whop from '@whop/sdk';

const client = new Whop({
  apiKey: process.env['WHOP_API_KEY'], // This is the default and can be omitted
});

// Automatically fetches more pages as needed.
for await (const productListItem of client.products.list({ company_id: 'biz_xxxxxxxxxxxxxx' })) {
  console.log(productListItem.id);
} {
  "data": [
    {
      "id": "prod_xxxxxxxxxxxxx",
      "title": "<string>",
      "visibility": "visible",
      "headline": "<string>",
      "verified": true,
      "business_type": "education_program",
      "industry_type": "trading",
      "created_at": "2023-12-01T05:00:00.401Z",
      "updated_at": "2023-12-01T05:00:00.401Z",
      "member_count": 42,
      "route": "<string>",
      "published_reviews_count": 42,
      "external_identifier": "<string>"
    }
  ],
  "page_info": {
    "end_cursor": "<string>",
    "start_cursor": "<string>",
    "has_next_page": true,
    "has_previous_page": true
  }
}  {
  "error": {
    "type": "<string>",
    "message": "<string>"
  }
}

CREATE PRODUCTS 
Products
Create product
Creates a new Product

Required permissions:

access_pass:create
access_pass:basic:read
POST
/
products

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Body
application/json
Parameters for CreateAccessPass

​
company_id
stringrequired
The ID of the company to create the product for.

Example:
"biz_xxxxxxxxxxxxxx"

​
title
stringrequired
The title of the product. It must be max 40 characters.

​
business_type
enum<string> | null
The business type of the product.

Available options: education_program, coaching, software, paid_group, newsletter, agency, physical_products, brick_and_mortar, events, coaching_and_courses, other, saas, course, community 
​
collect_shipping_address
boolean | null
Whether or not to collect shipping information at checkout from the customer.

​
custom_cta
enum<string> | null
The custom call to action for the product.

Available options: get_access, join, order_now, shop_now, call_now, donate_now, contact_us, sign_up, subscribe, purchase, get_offer, apply_now, complete_order 
​
custom_cta_url
string | null
The custom call to action URL for the product.

​
custom_statement_descriptor
string | null
The custom statement descriptor for the product i.e. WHOP*SPORTS, must be between 5 and 22 characters, contain at least one letter, and not contain any of the following characters: <, >, , ', "

​
description
string | null
A written description of the product.

​
experience_ids
string[] | null
An array of experience IDs that this pass has

Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as "VXNlci0xMA==") or integer (such as 4) input value will be accepted as an ID.

​
global_affiliate_percentage
number | null
The percentage of the revenue that goes to the global affiliate program.

Example:
6.9

​
global_affiliate_status
enum<string> | null
The status of the global affiliate program for this product.

Available options: enabled, disabled 
​
headline
string | null
The headline of the product.

​
industry_type
enum<string> | null
The industry type of the product.

Available options: trading, sports_betting, reselling, fitness, amazon_fba, real_estate, kindle_book_publishing, dating, agencies, health_and_wellness, social_media, sales, business, ecommerce, video_games, home_services, ai, public_speaking, personal_finance, careers, travel, clipping, spirituality, vas, personal_development, software, other, marketing_agency, sales_agency, ai_agency, design_agency, coaching_agency, development_agency, recruiting_agency, customer_support_agency, clipping_agency, clothing, supplements, beauty_and_personal_care, fitness_gear, accessories, home_goods, electronics_and_gadgets, food_and_beverages, gym, restaurant, retail_store, coffee_shop, salon_spa, medical_dentist_office, hotel_lodging, auto_repair_shop, masterminds, webinars, bootcamps, convention, concerts, meetups, parties 
​
member_affiliate_percentage
number | null
The percentage of the revenue that goes to the member affiliate program.

Example:
6.9

​
member_affiliate_status
enum<string> | null
The status of the member affiliate program for this product.

Available options: enabled, disabled 
​
plan_options
object
The details to assign an autogenerated plan.

Show child attributes

​
product_highlights
object[] | null
The product highlights for the product.

Show child attributes

​
product_tax_code_id
string | null
The ID of the product tax code to apply to this product.

Example:
"ptc_xxxxxxxxxxxxxx"

​
redirect_purchase_url
string | null
The URL to redirect the customer to after a purchase.

​
route
string | null
The route of the product.

​
visibility
enum<string> | null
This product will/will not be displayed publicly.

Available options: visible, hidden, archived, quick_link 
Response

200

application/json
A successful response

Represents a product on whop. Use products to sell anything on the platform.

​
id
stringrequired
The internal ID of the public product.

Example:
"prod_xxxxxxxxxxxxx"

​
title
stringrequired
The title of the product. Use for Whop 4.0.

​
visibility
enum<string>required
This product will/will not be displayed publicly.

Available options: visible, hidden, archived, quick_link 
​
headline
string | nullrequired
The headline of the product.

​
verified
booleanrequired
Whether this product is Whop verified.

​
business_type
enum<string> | nullrequired
The type of business the company is.

Available options: education_program, coaching, software, paid_group, newsletter, agency, physical_products, brick_and_mortar, events, coaching_and_courses, other, saas, course, community 
​
industry_type
enum<string> | nullrequired
The specific industry the company operates in.

Available options: trading, sports_betting, reselling, fitness, amazon_fba, real_estate, kindle_book_publishing, dating, agencies, health_and_wellness, social_media, sales, business, ecommerce, video_games, home_services, ai, public_speaking, personal_finance, careers, travel, clipping, spirituality, vas, personal_development, software, other, marketing_agency, sales_agency, ai_agency, design_agency, coaching_agency, development_agency, recruiting_agency, customer_support_agency, clipping_agency, clothing, supplements, beauty_and_personal_care, fitness_gear, accessories, home_goods, electronics_and_gadgets, food_and_beverages, gym, restaurant, retail_store, coffee_shop, salon_spa, medical_dentist_office, hotel_lodging, auto_repair_shop, masterminds, webinars, bootcamps, convention, concerts, meetups, parties 
​
created_at
string<date-time>required
When the product was created.

Example:
"2023-12-01T05:00:00.401Z"

​
updated_at
string<date-time>required
When the product was updated.

Example:
"2023-12-01T05:00:00.401Z"

​
member_count
integerrequired
The number of active users for this product.

Example:
42

​
route
stringrequired
The route of the product.

​
published_reviews_count
integerrequired
The number of reviews that have been published for the product.

Example:
42

​
external_identifier
string | nullrequired
A unique identifier used to create or update products. When provided on product creation endpoints, we’ll look up an existing product by this identifier — if it exists, we’ll update it; if not, we’ll create a new one.

​
description
string | nullrequired
A short description of what the company offers or does.

​
custom_cta
enum<string>required
The custom call to action for the product.

Available options: get_access, join, order_now, shop_now, call_now, donate_now, contact_us, sign_up, subscribe, purchase, get_offer, apply_now, complete_order 
​
custom_cta_url
string | nullrequired
The custom call to action URL for the product, if any.

​
custom_statement_descriptor
string | nullrequired
The custom statement descriptor for the product.

​
global_affiliate_percentage
number | nullrequired
The percentage of a transaction a user is eligible to earn from the whop marketplace global affiliate program.

Example:
6.9

​
global_affiliate_status
enum<string>required
The status of the global affiliate program for this product.

Available options: enabled, disabled 
​
member_affiliate_percentage
number | nullrequired
The percentage of a transaction a user is eligible to earn from the whop marketplace member affiliate program.

Example:
6.9

​
member_affiliate_status
enum<string>required
The status of the member affiliate program for this product.

Available options: enabled, disabled 
​
product_tax_code
objectrequired
The product tax code for the product, if any.

Show child attributes

​
owner_user
objectrequired
The user that owns the product (company owner).

Show child attributes

​
company
objectrequired
A short type of the company that this product belongs to.

Hide child attributes

​
company.id
stringrequired
The ID (tag) of the company.

Example:
"biz_xxxxxxxxxxxxxx"

​
company.route
stringrequired
The slug/route of the company on the Whop site.

​
company.title
stringrequired
The title of the company.
import Whop from '@whop/sdk';

const client = new Whop({
  apiKey: process.env['WHOP_API_KEY'], // This is the default and can be omitted
});

const product = await client.products.create({ company_id: 'biz_xxxxxxxxxxxxxx', title: 'title' });

console.log(product.id);
{
  "id": "prod_xxxxxxxxxxxxx",
  "title": "<string>",
  "visibility": "visible",
  "headline": "<string>",
  "verified": true,
  "business_type": "education_program",
  "industry_type": "trading",
  "created_at": "2023-12-01T05:00:00.401Z",
  "updated_at": "2023-12-01T05:00:00.401Z",
  "member_count": 42,
  "route": "<string>",
  "published_reviews_count": 42,
  "external_identifier": "<string>",
  "description": "<string>",
  "custom_cta": "get_access",
  "custom_cta_url": "<string>",
  "custom_statement_descriptor": "<string>",
  "global_affiliate_percentage": 6.9,
  "global_affiliate_status": "enabled",
  "member_affiliate_percentage": 6.9,
  "member_affiliate_status": "enabled",
  "product_tax_code": {
    "id": "ptc_xxxxxxxxxxxxxx",
    "name": "<string>",
    "product_type": "physical"
  },
  "owner_user": {
    "id": "user_xxxxxxxxxxxxx",
    "name": "John Doe",
    "username": "johndoe42"
  },
  "company": {
    "id": "biz_xxxxxxxxxxxxxx",
    "route": "<string>",
    "title": "<string>"
  }
}    Products
Retrieve product
Retrieves a product by ID or route

Required permissions:

access_pass:basic:read
GET
/
products
/
{id}

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID or route of the product

Example:
"prod_xxxxxxxxxxxxx"

Response

200

application/json
A successful response

Represents a product on whop. Use products to sell anything on the platform.

​
id
stringrequired
The internal ID of the public product.

Example:
"prod_xxxxxxxxxxxxx"

​
title
stringrequired
The title of the product. Use for Whop 4.0.

​
visibility
enum<string>required
This product will/will not be displayed publicly.

Available options: visible, hidden, archived, quick_link 
​
headline
string | nullrequired
The headline of the product.

​
verified
booleanrequired
Whether this product is Whop verified.

​
business_type
enum<string> | nullrequired
The type of business the company is.

Available options: education_program, coaching, software, paid_group, newsletter, agency, physical_products, brick_and_mortar, events, coaching_and_courses, other, saas, course, community 
​
industry_type
enum<string> | nullrequired
The specific industry the company operates in.

Available options: trading, sports_betting, reselling, fitness, amazon_fba, real_estate, kindle_book_publishing, dating, agencies, health_and_wellness, social_media, sales, business, ecommerce, video_games, home_services, ai, public_speaking, personal_finance, careers, travel, clipping, spirituality, vas, personal_development, software, other, marketing_agency, sales_agency, ai_agency, design_agency, coaching_agency, development_agency, recruiting_agency, customer_support_agency, clipping_agency, clothing, supplements, beauty_and_personal_care, fitness_gear, accessories, home_goods, electronics_and_gadgets, food_and_beverages, gym, restaurant, retail_store, coffee_shop, salon_spa, medical_dentist_office, hotel_lodging, auto_repair_shop, masterminds, webinars, bootcamps, convention, concerts, meetups, parties 
​
created_at
string<date-time>required
When the product was created.

Example:
"2023-12-01T05:00:00.401Z"

​
updated_at
string<date-time>required
When the product was updated.

Example:
"2023-12-01T05:00:00.401Z"

​
member_count
integerrequired
The number of active users for this product.

Example:
42

​
route
stringrequired
The route of the product.

​
published_reviews_count
integerrequired
The number of reviews that have been published for the product.

Example:
42

​
external_identifier
string | nullrequired
A unique identifier used to create or update products. When provided on product creation endpoints, we’ll look up an existing product by this identifier — if it exists, we’ll update it; if not, we’ll create a new one.

​
description
string | nullrequired
A short description of what the company offers or does.

​
custom_cta
enum<string>required
The custom call to action for the product.

Available options: get_access, join, order_now, shop_now, call_now, donate_now, contact_us, sign_up, subscribe, purchase, get_offer, apply_now, complete_order 
​
custom_cta_url
string | nullrequired
The custom call to action URL for the product, if any.

​
custom_statement_descriptor
string | nullrequired
The custom statement descriptor for the product.

​
global_affiliate_percentage
number | nullrequired
The percentage of a transaction a user is eligible to earn from the whop marketplace global affiliate program.

Example:
6.9

​
global_affiliate_status
enum<string>required
The status of the global affiliate program for this product.

Available options: enabled, disabled 
​
member_affiliate_percentage
number | nullrequired
The percentage of a transaction a user is eligible to earn from the whop marketplace member affiliate program.

Example:
6.9

​
member_affiliate_status
enum<string>required
The status of the member affiliate program for this product.

Available options: enabled, disabled 
​
product_tax_code
objectrequired
The product tax code for the product, if any.

Show child attributes

​
owner_user
objectrequired
The user that owns the product (company owner).

Show child attributes

​
company
objectrequired
A short type of the company that this product belongs to.

Hide child attributes

​
company.id
stringrequired
The ID (tag) of the company.

Example:
"biz_xxxxxxxxxxxxxx"

​
company.route
stringrequired
The slug/route of the company on the Whop site.

​
company.title
stringrequired
The title of the company.

Products
Update product
Updates an existing Product

Required permissions:

access_pass:update
access_pass:basic:read
PATCH
/
products
/
{id}

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID (tag) of the product

Example:
"prod_xxxxxxxxxxxxx"

Body
application/json
Parameters for UpdateAccessPass

​
business_type
enum<string> | null
The business type of the product.

Available options: education_program, coaching, software, paid_group, newsletter, agency, physical_products, brick_and_mortar, events, coaching_and_courses, other, saas, course, community 
​
collect_shipping_address
boolean | null
Whether or not to collect shipping information at checkout from the customer.

​
custom_cta
enum<string> | null
The custom call to action for the product.

Available options: get_access, join, order_now, shop_now, call_now, donate_now, contact_us, sign_up, subscribe, purchase, get_offer, apply_now, complete_order 
​
custom_cta_url
string | null
The custom call to action URL for the product.

​
custom_statement_descriptor
string | null
The custom statement descriptor for the product i.e. WHOP*SPORTS, must be between 5 and 22 characters, contain at least one letter, and not contain any of the following characters: <, >, , ', "

​
description
string | null
A written description of the product.

​
global_affiliate_percentage
number | null
The percentage of the revenue that goes to the global affiliate program.

Example:
6.9

​
global_affiliate_status
enum<string> | null
The status of the global affiliate program for this product.

Available options: enabled, disabled 
​
headline
string | null
The headline of the product.

​
industry_type
enum<string> | null
The industry type of the product.

Available options: trading, sports_betting, reselling, fitness, amazon_fba, real_estate, kindle_book_publishing, dating, agencies, health_and_wellness, social_media, sales, business, ecommerce, video_games, home_services, ai, public_speaking, personal_finance, careers, travel, clipping, spirituality, vas, personal_development, software, other, marketing_agency, sales_agency, ai_agency, design_agency, coaching_agency, development_agency, recruiting_agency, customer_support_agency, clipping_agency, clothing, supplements, beauty_and_personal_care, fitness_gear, accessories, home_goods, electronics_and_gadgets, food_and_beverages, gym, restaurant, retail_store, coffee_shop, salon_spa, medical_dentist_office, hotel_lodging, auto_repair_shop, masterminds, webinars, bootcamps, convention, concerts, meetups, parties 
​
member_affiliate_percentage
number | null
The percentage of the revenue that goes to the member affiliate program.

Example:
6.9

​
member_affiliate_status
enum<string> | null
The status of the member affiliate program for this product.

Available options: enabled, disabled 
​
product_tax_code_id
string | null
The ID of the product tax code to apply to this product.

Example:
"ptc_xxxxxxxxxxxxxx"

​
redirect_purchase_url
string | null
The URL to redirect the customer to after a purchase.

​
route
string | null
The route of the product.

​
store_page_config
object
Configuration for a product on the company's store page.

Show child attributes

​
title
string | null
The title of the product.

​
visibility
enum<string> | null
This product will/will not be displayed publicly.

Available options: visible, hidden, archived, quick_link 
Response

200

application/json
A successful response

Represents a product on whop. Use products to sell anything on the platform.

​
id
stringrequired
The internal ID of the public product.

Example:
"prod_xxxxxxxxxxxxx"

​
title
stringrequired
The title of the product. Use for Whop 4.0.

​
visibility
enum<string>required
This product will/will not be displayed publicly.

Available options: visible, hidden, archived, quick_link 
​
headline
string | nullrequired
The headline of the product.

​
verified
booleanrequired
Whether this product is Whop verified.

​
business_type
enum<string> | nullrequired
The type of business the company is.

Available options: education_program, coaching, software, paid_group, newsletter, agency, physical_products, brick_and_mortar, events, coaching_and_courses, other, saas, course, community 
​
industry_type
enum<string> | nullrequired
The specific industry the company operates in.

Available options: trading, sports_betting, reselling, fitness, amazon_fba, real_estate, kindle_book_publishing, dating, agencies, health_and_wellness, social_media, sales, business, ecommerce, video_games, home_services, ai, public_speaking, personal_finance, careers, travel, clipping, spirituality, vas, personal_development, software, other, marketing_agency, sales_agency, ai_agency, design_agency, coaching_agency, development_agency, recruiting_agency, customer_support_agency, clipping_agency, clothing, supplements, beauty_and_personal_care, fitness_gear, accessories, home_goods, electronics_and_gadgets, food_and_beverages, gym, restaurant, retail_store, coffee_shop, salon_spa, medical_dentist_office, hotel_lodging, auto_repair_shop, masterminds, webinars, bootcamps, convention, concerts, meetups, parties 
​
created_at
string<date-time>required
When the product was created.

Example:
"2023-12-01T05:00:00.401Z"

​
updated_at
string<date-time>required
When the product was updated.

Example:
"2023-12-01T05:00:00.401Z"

​
member_count
integerrequired
The number of active users for this product.

Example:
42

​
route
stringrequired
The route of the product.

​
published_reviews_count
integerrequired
The number of reviews that have been published for the product.

Example:
42

​
external_identifier
string | nullrequired
A unique identifier used to create or update products. When provided on product creation endpoints, we’ll look up an existing product by this identifier — if it exists, we’ll update it; if not, we’ll create a new one.

​
description
string | nullrequired
A short description of what the company offers or does.

​
custom_cta
enum<string>required
The custom call to action for the product.

Available options: get_access, join, order_now, shop_now, call_now, donate_now, contact_us, sign_up, subscribe, purchase, get_offer, apply_now, complete_order 
​
custom_cta_url
string | nullrequired
The custom call to action URL for the product, if any.

​
custom_statement_descriptor
string | nullrequired
The custom statement descriptor for the product.

​
global_affiliate_percentage
number | nullrequired
The percentage of a transaction a user is eligible to earn from the whop marketplace global affiliate program.

Example:
6.9

​
global_affiliate_status
enum<string>required
The status of the global affiliate program for this product.

Available options: enabled, disabled 
​
member_affiliate_percentage
number | nullrequired
The percentage of a transaction a user is eligible to earn from the whop marketplace member affiliate program.

Example:
6.9

​
member_affiliate_status
enum<string>required
The status of the member affiliate program for this product.

Available options: enabled, disabled 
​
product_tax_code
objectrequired
The product tax code for the product, if any.

Show child attributes

​
owner_user
objectrequired
The user that owns the product (company owner).

Show child attributes

​
company
objectrequired
A short type of the company that this product belongs to.

Hide child attributes

​
company.id
stringrequired
The ID (tag) of the company.

Example:
"biz_xxxxxxxxxxxxxx"

​
company.route
stringrequired
The slug/route of the company on the Whop site.

​
company.title
stringrequired
The title of the company.

Products
Delete product
Deletes an existing Product

Required permissions:

access_pass:delete
DELETE
/
products
/
{id}

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The internal ID (tag) of the product to delete.

Example:
"prod_xxxxxxxxxxxxx"

Response

200

application/json
A successful response

Represents true or false values.

Was this page helpful?


Yes

No

import Whop from '@whop/sdk';

const client = new Whop({
  apiKey: process.env['WHOP_API_KEY'], // This is the default and can be omitted
});

const product = await client.products.delete('prod_xxxxxxxxxxxxx');

console.log(product);


LIST PAYMENTS 
Payments
List payments
Lists payments

Required permissions:

payment:basic:read
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
GET
/
payments

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Query Parameters
​
after
string | null
Returns the elements in the list that come after the specified cursor.

​
before
string | null
Returns the elements in the list that come before the specified cursor.

​
first
integer | null
Returns the first n elements from the list.

Example:
42

​
last
integer | null
Returns the last n elements from the list.

Example:
42

​
company_id
stringrequired
The ID of the company to list payments for

Example:
"biz_xxxxxxxxxxxxxx"

​
direction
enum<string> | null
Which way to order the results.

Available options: asc, desc 
​
order
enum<string> | null
How to order the results.

Available options: final_amount, created_at, paid_at 
​
product_ids
string[] | null
A specific product.

Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as "VXNlci0xMA==") or integer (such as 4) input value will be accepted as an ID.

​
billing_reasons
enum<string>[] | null
The billing reason for the payment

The reason why a specific payment was billed

Available options: subscription_create, subscription_cycle, subscription_update, one_time, manual, subscription 
​
currencies
enum<string>[] | null
The currency of the payment.

The available currencies on the platform

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
plan_ids
string[] | null
A specific plan.

Represents a unique identifier that is Base64 obfuscated. It is often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as "VXNlci0xMA==") or integer (such as 4) input value will be accepted as an ID.

​
statuses
enum<string>[] | null
The status of the payment.

The status of a receipt

Available options: draft, open, paid, pending, uncollectible, unresolved, void 
​
substatuses
enum<string>[] | null
The substatus of the payment.

The friendly status of a receipt

Available options: auto_refunded, refunded, partially_refunded, dispute_warning, open_resolution, open_dispute, failed, price_too_low, succeeded, drafted, uncollectible, unresolved, past_due, pending, incomplete, canceled 
​
include_free
boolean | null
Whether to include free payments.

​
created_before
string<date-time> | null
The maximum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

​
created_after
string<date-time> | null
The minimum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

Response

200

application/json
A successful response

The connection type for Receipt.

​
data
object[]required
A list of nodes.

Show child attributes

​
page_info
objectrequired
Information to aid in pagination.

Hide child attributes

​
page_info.end_cursor
string | nullrequired
When paginating forwards, the cursor to continue.

​
page_info.start_cursor
string | nullrequired
When paginating backwards, the cursor to continue.

​
page_info.has_next_page
booleanrequired
When paginating forwards, are there more items?

​
page_info.has_previous_page
booleanrequired
When paginating backwards, are there more items?

ments
Create payment
Charge an existing member off-session using one of their stored payment methods. You can provide an existing plan, or create a new one in-line. This endpoint will respond with a payment object immediately, but the payment is processed asynchronously in the background. Use webhooks to be notified when the payment succeeds or fails.

Required permissions:

payment:charge
plan:create
access_pass:create
access_pass:update
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
POST
/
payments

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Body
application/json
CreatePaymentInputWithPlan
CreatePaymentInputWithPlanId
Parameters for CreatePayment
Autogenerated input type of CreatePayment

​
company_id
stringrequired
The ID of the company to create the payment for.

Example:
"biz_xxxxxxxxxxxxxx"

​
member_id
stringrequired
The ID of the member to create the payment for.

Example:
"mber_xxxxxxxxxxxxx"

​
payment_method_id
stringrequired
The ID of the payment method to use for the payment. It must be connected to the Member being charged.

Example:
"pmt_xxxxxxxxxxxxxx"

​
plan
objectrequired
Pass this object to create a new plan for this payment

Show child attributes

Response

200

application/json
A successful response

An object representing a receipt for a membership.

​
id
stringrequired
The payment ID

Example:
"pay_xxxxxxxxxxxxxx"

​
status
enum<string> | nullrequired
The current state of the payment.

Available options: draft, open, paid, pending, uncollectible, unresolved, void 
​
substatus
enum<string>required
The friendly status of the payment.

Available options: auto_refunded, refunded, partially_refunded, dispute_warning, open_resolution, open_dispute, failed, price_too_low, succeeded, drafted, uncollectible, unresolved, past_due, pending, incomplete, canceled 
​
refundable
booleanrequired
True only for payments that are paid, have not been fully refunded, and were processed by a payment processor that allows refunds.

​
retryable
booleanrequired
True when the payment status is open and its membership is in one of the retry-eligible states (active, trialing, completed, or past_due); otherwise false. Used to decide if Whop can attempt the charge again.

​
voidable
booleanrequired
True when the payment is tied to a membership in past_due, the payment status is open, and the processor allows voiding payments; otherwise false.

​
created_at
string<date-time>required
The datetime the payment was created

Example:
"2023-12-01T05:00:00.401Z"

​
paid_at
string<date-time> | nullrequired
The datetime the payment was paid

Example:
"2023-12-01T05:00:00.401Z"

​
last_payment_attempt
string<date-time> | nullrequired
The time of the last payment attempt.

Example:
"2023-12-01T05:00:00.401Z"

​
dispute_alerted_at
string<date-time> | nullrequired
When an alert came in that this transaction will be disputed

Example:
"2023-12-01T05:00:00.401Z"

​
refunded_at
string<date-time> | nullrequired
When the payment was refunded (if applicable).

Example:
"2023-12-01T05:00:00.401Z"

​
plan
objectrequired
The plan attached to this payment.

Show child attributes

​
product
objectrequired
The product this payment was made for

Show child attributes

​
user
objectrequired
The user that made this payment.

Show child attributes

​
membership
objectrequired
The membership attached to this payment.

Show child attributes

​
member
objectrequired
The member attached to this payment.

Show child attributes

​
payment_method
objectrequired
The payment method used for the payment, if available.

Show child attributes

​
company
objectrequired
The company for the payment.

Show child attributes

​
promo_code
objectrequired
The promo code used for this payment.

Show child attributes

​
currency
enum<string> | nullrequired
The currency of the payment.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
total
number | nullrequired
The total to show to the creator (excluding buyer fees).

Example:
6.9

​
subtotal
number | nullrequired
The subtotal to show to the creator (excluding buyer fees).

Example:
6.9

​
usd_total
number | nullrequired
The total in USD to show to the creator (excluding buyer fees).

Example:
6.9

​
refunded_amount
number | nullrequired
The payment refund amount(if applicable).

Example:
6.9

​
auto_refunded
booleanrequired
Whether this payment was auto refunded or not

​
amount_after_fees
numberrequired
How much the payment is for after fees

Example:
6.9

​
card_brand
enum<string> | nullrequired
Card network reported by the processor (for example visa, mastercard, amex). Present only when the underlying payment method type is card.

Available options: mastercard, visa, amex, discover, unionpay, jcb, diners, link, troy, visadankort, visabancontact, china_union_pay, rupay, jcbrupay, elo, maestro, unknown 
​
card_last4
string | nullrequired
The last 4 digits of the card used to make the payment.

​
billing_address
objectrequired
The address of the user who made the payment.

Show child attributes

​
payment_method_type
enum<string> | nullrequired
Machine-readable identifier for the payment method used on the payment. Examples include card, cashapp ..., local methods such as ideal, sofort, ... BNPL options like klarna, affirm, ..., or crypto. Returns null when the processor does not supply a type.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
billing_reason
enum<string> | nullrequired
The reason for the charge.

Available options: subscription_create, subscription_cycle, subscription_update, one_time, manual, subscription 
​
failure_message
string | nullrequired
If the payment failed, the reason for the failure.

​
metadata
objectrequired
The custom metadata stored on this payment. This will be copied the checkout configuration for which this payment was made

Retrieve payment
Retrieves a payment by ID

Required permissions:

payment:basic:read
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
GET
/
payments
/
{id}

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the payment

Example:
"pay_xxxxxxxxxxxxxx"

Response

200

application/json
A successful response

An object representing a receipt for a membership.

​
id
stringrequired
The payment ID

Example:
"pay_xxxxxxxxxxxxxx"

​
status
enum<string> | nullrequired
The current state of the payment.

Available options: draft, open, paid, pending, uncollectible, unresolved, void 
​
substatus
enum<string>required
The friendly status of the payment.

Available options: auto_refunded, refunded, partially_refunded, dispute_warning, open_resolution, open_dispute, failed, price_too_low, succeeded, drafted, uncollectible, unresolved, past_due, pending, incomplete, canceled 
​
refundable
booleanrequired
True only for payments that are paid, have not been fully refunded, and were processed by a payment processor that allows refunds.

​
retryable
booleanrequired
True when the payment status is open and its membership is in one of the retry-eligible states (active, trialing, completed, or past_due); otherwise false. Used to decide if Whop can attempt the charge again.

​
voidable
booleanrequired
True when the payment is tied to a membership in past_due, the payment status is open, and the processor allows voiding payments; otherwise false.

​
created_at
string<date-time>required
The datetime the payment was created

Example:
"2023-12-01T05:00:00.401Z"

​
paid_at
string<date-time> | nullrequired
The datetime the payment was paid

Example:
"2023-12-01T05:00:00.401Z"

​
last_payment_attempt
string<date-time> | nullrequired
The time of the last payment attempt.

Example:
"2023-12-01T05:00:00.401Z"

​
dispute_alerted_at
string<date-time> | nullrequired
When an alert came in that this transaction will be disputed

Example:
"2023-12-01T05:00:00.401Z"

​
refunded_at
string<date-time> | nullrequired
When the payment was refunded (if applicable).

Example:
"2023-12-01T05:00:00.401Z"

​
plan
objectrequired
The plan attached to this payment.

Show child attributes

​
product
objectrequired
The product this payment was made for

Show child attributes

​
user
objectrequired
The user that made this payment.

Show child attributes

​
membership
objectrequired
The membership attached to this payment.

Show child attributes

​
member
objectrequired
The member attached to this payment.

Show child attributes

​
payment_method
objectrequired
The payment method used for the payment, if available.

Show child attributes

​
company
objectrequired
The company for the payment.

Show child attributes

​
promo_code
objectrequired
The promo code used for this payment.

Show child attributes

​
currency
enum<string> | nullrequired
The currency of the payment.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
total
number | nullrequired
The total to show to the creator (excluding buyer fees).

Example:
6.9

​
subtotal
number | nullrequired
The subtotal to show to the creator (excluding buyer fees).

Example:
6.9

​
usd_total
number | nullrequired
The total in USD to show to the creator (excluding buyer fees).

Example:
6.9

​
refunded_amount
number | nullrequired
The payment refund amount(if applicable).

Example:
6.9

​
auto_refunded
booleanrequired
Whether this payment was auto refunded or not

​
amount_after_fees
numberrequired
How much the payment is for after fees

Example:
6.9

​
card_brand
enum<string> | nullrequired
Card network reported by the processor (for example visa, mastercard, amex). Present only when the underlying payment method type is card.

Available options: mastercard, visa, amex, discover, unionpay, jcb, diners, link, troy, visadankort, visabancontact, china_union_pay, rupay, jcbrupay, elo, maestro, unknown 
​
card_last4
string | nullrequired
The last 4 digits of the card used to make the payment.

​
billing_address
objectrequired
The address of the user who made the payment.

Show child attributes

​
payment_method_type
enum<string> | nullrequired
Machine-readable identifier for the payment method used on the payment. Examples include card, cashapp ..., local methods such as ideal, sofort, ... BNPL options like klarna, affirm, ..., or crypto. Returns null when the processor does not supply a type.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
billing_reason
enum<string> | nullrequired
The reason for the charge.

Available options: subscription_create, subscription_cycle, subscription_update, one_time, manual, subscription 
​
failure_message
string | nullrequired
If the payment failed, the reason for the failure.

​
metadata
objectrequired
The custom metadata stored on this payment. This will be copied the checkout configuration for which this payment was made

Payments
List fees
Lists fees for a payment

Required permissions:

payment:basic:read
GET
/
payments
/
{id}
/
fees

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the payment to list fees for

Example:
"pay_xxxxxxxxxxxxxx"

Query Parameters
​
after
string | null
Returns the elements in the list that come after the specified cursor.

​
before
string | null
Returns the elements in the list that come before the specified cursor.

​
first
integer | null
Returns the first n elements from the list.

Example:
42

​
last
integer | null
Returns the last n elements from the list.

Example:
42

Response

200

application/json
A successful response

The connection type for Fee.

​
data
object[]required
A list of nodes.

Show child attributes

​
page_info
objectrequired
Information to aid in pagination.

Hide child attributes

​
page_info.end_cursor
string | nullrequired
When paginating forwards, the cursor to continue.

​
page_info.start_cursor
string | nullrequired
When paginating backwards, the cursor to continue.

​
page_info.has_next_page
booleanrequired
When paginating forwards, are there more items?

​
page_info.has_previous_page
booleanrequired
When paginating backwards, are there more items?


Payments
Refund payment
Refunds a payment

Required permissions:

payment:manage
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
POST
/
payments
/
{id}
/
refund

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the payment you want to update or take action upon.

Example:
"pay_xxxxxxxxxxxxxx"

Body
application/json
Parameters for RefundPayment

​
partial_amount
number | null
An amount if the refund is supposed to be partial.

Example:
6.9

Response

200

application/json
A successful response

An object representing a receipt for a membership.

​
id
stringrequired
The payment ID

Example:
"pay_xxxxxxxxxxxxxx"

​
status
enum<string> | nullrequired
The current state of the payment.

Available options: draft, open, paid, pending, uncollectible, unresolved, void 
​
substatus
enum<string>required
The friendly status of the payment.

Available options: auto_refunded, refunded, partially_refunded, dispute_warning, open_resolution, open_dispute, failed, price_too_low, succeeded, drafted, uncollectible, unresolved, past_due, pending, incomplete, canceled 
​
refundable
booleanrequired
True only for payments that are paid, have not been fully refunded, and were processed by a payment processor that allows refunds.

​
retryable
booleanrequired
True when the payment status is open and its membership is in one of the retry-eligible states (active, trialing, completed, or past_due); otherwise false. Used to decide if Whop can attempt the charge again.

​
voidable
booleanrequired
True when the payment is tied to a membership in past_due, the payment status is open, and the processor allows voiding payments; otherwise false.

​
created_at
string<date-time>required
The datetime the payment was created

Example:
"2023-12-01T05:00:00.401Z"

​
paid_at
string<date-time> | nullrequired
The datetime the payment was paid

Example:
"2023-12-01T05:00:00.401Z"

​
last_payment_attempt
string<date-time> | nullrequired
The time of the last payment attempt.

Example:
"2023-12-01T05:00:00.401Z"

​
dispute_alerted_at
string<date-time> | nullrequired
When an alert came in that this transaction will be disputed

Example:
"2023-12-01T05:00:00.401Z"

​
refunded_at
string<date-time> | nullrequired
When the payment was refunded (if applicable).

Example:
"2023-12-01T05:00:00.401Z"

​
plan
objectrequired
The plan attached to this payment.

Show child attributes

​
product
objectrequired
The product this payment was made for

Show child attributes

​
user
objectrequired
The user that made this payment.

Show child attributes

​
membership
objectrequired
The membership attached to this payment.

Show child attributes

​
member
objectrequired
The member attached to this payment.

Show child attributes

​
payment_method
objectrequired
The payment method used for the payment, if available.

Show child attributes

​
company
objectrequired
The company for the payment.

Show child attributes

​
promo_code
objectrequired
The promo code used for this payment.

Show child attributes

​
currency
enum<string> | nullrequired
The currency of the payment.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
total
number | nullrequired
The total to show to the creator (excluding buyer fees).

Example:
6.9

​
subtotal
number | nullrequired
The subtotal to show to the creator (excluding buyer fees).

Example:
6.9

​
usd_total
number | nullrequired
The total in USD to show to the creator (excluding buyer fees).

Example:
6.9

​
refunded_amount
number | nullrequired
The payment refund amount(if applicable).

Example:
6.9

​
auto_refunded
booleanrequired
Whether this payment was auto refunded or not

​
amount_after_fees
numberrequired
How much the payment is for after fees

Example:
6.9

​
card_brand
enum<string> | nullrequired
Card network reported by the processor (for example visa, mastercard, amex). Present only when the underlying payment method type is card.

Available options: mastercard, visa, amex, discover, unionpay, jcb, diners, link, troy, visadankort, visabancontact, china_union_pay, rupay, jcbrupay, elo, maestro, unknown 
​
card_last4
string | nullrequired
The last 4 digits of the card used to make the payment.

​
billing_address
objectrequired
The address of the user who made the payment.

Show child attributes

​
payment_method_type
enum<string> | nullrequired
Machine-readable identifier for the payment method used on the payment. Examples include card, cashapp ..., local methods such as ideal, sofort, ... BNPL options like klarna, affirm, ..., or crypto. Returns null when the processor does not supply a type.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
billing_reason
enum<string> | nullrequired
The reason for the charge.

Available options: subscription_create, subscription_cycle, subscription_update, one_time, manual, subscription 
​
failure_message
string | nullrequired
If the payment failed, the reason for the failure.

​
metadata
objectrequired
The custom metadata stored on this payment. This will be copied the checkout configuration for which this payment was made


Retry payment
Retries a payment

Required permissions:

payment:manage
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
POST
/
payments
/
{id}
/
retry

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the payment

Example:
"pay_xxxxxxxxxxxxxx"

Response

200

application/json
A successful response

An object representing a receipt for a membership.

​
id
stringrequired
The payment ID

Example:
"pay_xxxxxxxxxxxxxx"

​
status
enum<string> | nullrequired
The current state of the payment.

Available options: draft, open, paid, pending, uncollectible, unresolved, void 
​
substatus
enum<string>required
The friendly status of the payment.

Available options: auto_refunded, refunded, partially_refunded, dispute_warning, open_resolution, open_dispute, failed, price_too_low, succeeded, drafted, uncollectible, unresolved, past_due, pending, incomplete, canceled 
​
refundable
booleanrequired
True only for payments that are paid, have not been fully refunded, and were processed by a payment processor that allows refunds.

​
retryable
booleanrequired
True when the payment status is open and its membership is in one of the retry-eligible states (active, trialing, completed, or past_due); otherwise false. Used to decide if Whop can attempt the charge again.

​
voidable
booleanrequired
True when the payment is tied to a membership in past_due, the payment status is open, and the processor allows voiding payments; otherwise false.

​
created_at
string<date-time>required
The datetime the payment was created

Example:
"2023-12-01T05:00:00.401Z"

​
paid_at
string<date-time> | nullrequired
The datetime the payment was paid

Example:
"2023-12-01T05:00:00.401Z"

​
last_payment_attempt
string<date-time> | nullrequired
The time of the last payment attempt.

Example:
"2023-12-01T05:00:00.401Z"

​
dispute_alerted_at
string<date-time> | nullrequired
When an alert came in that this transaction will be disputed

Example:
"2023-12-01T05:00:00.401Z"

​
refunded_at
string<date-time> | nullrequired
When the payment was refunded (if applicable).

Example:
"2023-12-01T05:00:00.401Z"

​
plan
objectrequired
The plan attached to this payment.

Show child attributes

​
product
objectrequired
The product this payment was made for

Show child attributes

​
user
objectrequired
The user that made this payment.

Show child attributes

​
membership
objectrequired
The membership attached to this payment.

Show child attributes

​
member
objectrequired
The member attached to this payment.

Show child attributes

​
payment_method
objectrequired
The payment method used for the payment, if available.

Show child attributes

​
company
objectrequired
The company for the payment.

Show child attributes

​
promo_code
objectrequired
The promo code used for this payment.

Show child attributes

​
currency
enum<string> | nullrequired
The currency of the payment.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
total
number | nullrequired
The total to show to the creator (excluding buyer fees).

Example:
6.9

​
subtotal
number | nullrequired
The subtotal to show to the creator (excluding buyer fees).

Example:
6.9

​
usd_total
number | nullrequired
The total in USD to show to the creator (excluding buyer fees).

Example:
6.9

​
refunded_amount
number | nullrequired
The payment refund amount(if applicable).

Example:
6.9

​
auto_refunded
booleanrequired
Whether this payment was auto refunded or not

​
amount_after_fees
numberrequired
How much the payment is for after fees

Example:
6.9

​
card_brand
enum<string> | nullrequired
Card network reported by the processor (for example visa, mastercard, amex). Present only when the underlying payment method type is card.

Available options: mastercard, visa, amex, discover, unionpay, jcb, diners, link, troy, visadankort, visabancontact, china_union_pay, rupay, jcbrupay, elo, maestro, unknown 
​
card_last4
string | nullrequired
The last 4 digits of the card used to make the payment.

​
billing_address
objectrequired
The address of the user who made the payment.

Show child attributes

​
payment_method_type
enum<string> | nullrequired
Machine-readable identifier for the payment method used on the payment. Examples include card, cashapp ..., local methods such as ideal, sofort, ... BNPL options like klarna, affirm, ..., or crypto. Returns null when the processor does not supply a type.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
billing_reason
enum<string> | nullrequired
The reason for the charge.

Available options: subscription_create, subscription_cycle, subscription_update, one_time, manual, subscription 
​
failure_message
string | nullrequired
If the payment failed, the reason for the failure.

​
metadata
objectrequired
The custom metadata stored on this payment. This will be copied the checkout configuration for which this payment was made

Void payment
Voids a payment

Required permissions:

payment:manage
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
POST
/
payments
/
{id}
/
void

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the payment you want to void.

Example:
"pay_xxxxxxxxxxxxxx"

Response

200

application/json
A successful response

An object representing a receipt for a membership.

​
id
stringrequired
The payment ID

Example:
"pay_xxxxxxxxxxxxxx"

​
status
enum<string> | nullrequired
The current state of the payment.

Available options: draft, open, paid, pending, uncollectible, unresolved, void 
​
substatus
enum<string>required
The friendly status of the payment.

Available options: auto_refunded, refunded, partially_refunded, dispute_warning, open_resolution, open_dispute, failed, price_too_low, succeeded, drafted, uncollectible, unresolved, past_due, pending, incomplete, canceled 
​
refundable
booleanrequired
True only for payments that are paid, have not been fully refunded, and were processed by a payment processor that allows refunds.

​
retryable
booleanrequired
True when the payment status is open and its membership is in one of the retry-eligible states (active, trialing, completed, or past_due); otherwise false. Used to decide if Whop can attempt the charge again.

​
voidable
booleanrequired
True when the payment is tied to a membership in past_due, the payment status is open, and the processor allows voiding payments; otherwise false.

​
created_at
string<date-time>required
The datetime the payment was created

Example:
"2023-12-01T05:00:00.401Z"

​
paid_at
string<date-time> | nullrequired
The datetime the payment was paid

Example:
"2023-12-01T05:00:00.401Z"

​
last_payment_attempt
string<date-time> | nullrequired
The time of the last payment attempt.

Example:
"2023-12-01T05:00:00.401Z"

​
dispute_alerted_at
string<date-time> | nullrequired
When an alert came in that this transaction will be disputed

Example:
"2023-12-01T05:00:00.401Z"

​
refunded_at
string<date-time> | nullrequired
When the payment was refunded (if applicable).

Example:
"2023-12-01T05:00:00.401Z"

​
plan
objectrequired
The plan attached to this payment.

Show child attributes

​
product
objectrequired
The product this payment was made for

Show child attributes

​
user
objectrequired
The user that made this payment.

Show child attributes

​
membership
objectrequired
The membership attached to this payment.

Show child attributes

​
member
objectrequired
The member attached to this payment.

Show child attributes

​
payment_method
objectrequired
The payment method used for the payment, if available.

Show child attributes

​
company
objectrequired
The company for the payment.

Show child attributes

​
promo_code
objectrequired
The promo code used for this payment.

Show child attributes

​
currency
enum<string> | nullrequired
The currency of the payment.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
total
number | nullrequired
The total to show to the creator (excluding buyer fees).

Example:
6.9

​
subtotal
number | nullrequired
The subtotal to show to the creator (excluding buyer fees).

Example:
6.9

​
usd_total
number | nullrequired
The total in USD to show to the creator (excluding buyer fees).

Example:
6.9

​
refunded_amount
number | nullrequired
The payment refund amount(if applicable).

Example:
6.9

​
auto_refunded
booleanrequired
Whether this payment was auto refunded or not

​
amount_after_fees
numberrequired
How much the payment is for after fees

Example:
6.9

​
card_brand
enum<string> | nullrequired
Card network reported by the processor (for example visa, mastercard, amex). Present only when the underlying payment method type is card.

Available options: mastercard, visa, amex, discover, unionpay, jcb, diners, link, troy, visadankort, visabancontact, china_union_pay, rupay, jcbrupay, elo, maestro, unknown 
​
card_last4
string | nullrequired
The last 4 digits of the card used to make the payment.

​
billing_address
objectrequired
The address of the user who made the payment.

Show child attributes

​
payment_method_type
enum<string> | nullrequired
Machine-readable identifier for the payment method used on the payment. Examples include card, cashapp ..., local methods such as ideal, sofort, ... BNPL options like klarna, affirm, ..., or crypto. Returns null when the processor does not supply a type.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
billing_reason
enum<string> | nullrequired
The reason for the charge.

Available options: subscription_create, subscription_cycle, subscription_update, one_time, manual, subscription 
​
failure_message
string | nullrequired
If the payment failed, the reason for the failure.

​
metadata
objectrequired
The custom metadata stored on this payment. This will be copied the checkout configuration for which this payment was made

Payment created
Sent when a payment is created

Required permissions:

payment:basic:read
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
webhook_receive:payments
POST
payment.created
Headers
​
webhook-signature
stringrequired
The signature of the webhook request with the webhook version prepended

Example:
"v1,BASE64ENCODEDSIGNATURE"

​
webhook-timestamp
stringrequired
The timestamp in seconds since the Unix epoch that the webhook was sent at on the server

Example:
"1727606400"

Body
application/json
​
id
stringrequired
A unique ID for every single webhook request

Example:
"msg_xxxxxxxxxxxxxxxxxxxxxxxx"

​
api_version
stringrequired
The API version for this webhook

Allowed value: "v1"
Example:
"v1"

​
timestamp
string<date-time>required
The timestamp in ISO 8601 format that the webhook was sent at on the server

Example:
"2025-01-01T00:00:00.000Z"

​
type
stringrequired
The webhook event type

Allowed value: "payment.created"
Example:
"payment.created"

​
data
objectrequired
An object representing a receipt for a membership.

Show child attributes

Response
200
Return a 200 status to indicate that the data was received successfully

Payment succeeded
Sent when a payment is succeeded

Required permissions:

payment:basic:read
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
webhook_receive:payments
POST
payment.succeeded
Headers
​
webhook-signature
stringrequired
The signature of the webhook request with the webhook version prepended

Example:
"v1,BASE64ENCODEDSIGNATURE"

​
webhook-timestamp
stringrequired
The timestamp in seconds since the Unix epoch that the webhook was sent at on the server

Example:
"1727606400"

Body
application/json
​
id
stringrequired
A unique ID for every single webhook request

Example:
"msg_xxxxxxxxxxxxxxxxxxxxxxxx"

​
api_version
stringrequired
The API version for this webhook

Allowed value: "v1"
Example:
"v1"

​
timestamp
string<date-time>required
The timestamp in ISO 8601 format that the webhook was sent at on the server

Example:
"2025-01-01T00:00:00.000Z"

​
type
stringrequired
The webhook event type

Allowed value: "payment.succeeded"
Example:
"payment.succeeded"

​
data
objectrequired
An object representing a receipt for a membership.

Show child attributes

Response
200
Return a 200 status to indicate that the data was received successfully

Payment failed
Sent when a payment is failed

Required permissions:

payment:basic:read
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
webhook_receive:payments
POST
payment.failed
Headers
​
webhook-signature
stringrequired
The signature of the webhook request with the webhook version prepended

Example:
"v1,BASE64ENCODEDSIGNATURE"

​
webhook-timestamp
stringrequired
The timestamp in seconds since the Unix epoch that the webhook was sent at on the server

Example:
"1727606400"

Body
application/json
​
id
stringrequired
A unique ID for every single webhook request

Example:
"msg_xxxxxxxxxxxxxxxxxxxxxxxx"

​
api_version
stringrequired
The API version for this webhook

Allowed value: "v1"
Example:
"v1"

​
timestamp
string<date-time>required
The timestamp in ISO 8601 format that the webhook was sent at on the server

Example:
"2025-01-01T00:00:00.000Z"

​
type
stringrequired
The webhook event type

Allowed value: "payment.failed"
Example:
"payment.failed"

​
data
objectrequired
An object representing a receipt for a membership.

Show child attributes

Response
200
Return a 200 status to indicate that the data was received successfully

Payment pending
Sent when a payment is pending

Required permissions:

payment:basic:read
plan:basic:read
access_pass:basic:read
member:email:read
member:basic:read
member:phone:read
promo_code:basic:read
webhook_receive:payments
POST
payment.pending
Headers
​
webhook-signature
stringrequired
The signature of the webhook request with the webhook version prepended

Example:
"v1,BASE64ENCODEDSIGNATURE"

​
webhook-timestamp
stringrequired
The timestamp in seconds since the Unix epoch that the webhook was sent at on the server

Example:
"1727606400"

Body
application/json
​
id
stringrequired
A unique ID for every single webhook request

Example:
"msg_xxxxxxxxxxxxxxxxxxxxxxxx"

​
api_version
stringrequired
The API version for this webhook

Allowed value: "v1"
Example:
"v1"

​
timestamp
string<date-time>required
The timestamp in ISO 8601 format that the webhook was sent at on the server

Example:
"2025-01-01T00:00:00.000Z"

​
type
stringrequired
The webhook event type

Allowed value: "payment.pending"
Example:
"payment.pending"

​
data
objectrequired
An object representing a receipt for a membership.

Show child attributes

Response
200
Return a 200 status to indicate that the data was received successfully

List checkout configurations
Lists checkout configurations

Required permissions:

checkout_configuration:basic:read
GET
/
checkout_configurations

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Query Parameters
​
after
string | null
Returns the elements in the list that come after the specified cursor.

​
before
string | null
Returns the elements in the list that come before the specified cursor.

​
first
integer | null
Returns the first n elements from the list.

Example:
42

​
last
integer | null
Returns the last n elements from the list.

Example:
42

​
company_id
stringrequired
The ID of the company to list checkout configurations for

Example:
"biz_xxxxxxxxxxxxxx"

​
direction
enum<string> | null
The direction to sort the checkout configurations by

Available options: asc, desc 
​
plan_id
string | null
The ID of the plan to filter checkout configurations by

Example:
"plan_xxxxxxxxxxxxx"

​
created_before
string<date-time> | null
The maximum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

​
created_after
string<date-time> | null
The minimum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

Response

200

application/json
A successful response

The connection type for CheckoutSession.

​
data
object[]required
A list of nodes.

Show child attributes

​
page_info
objectrequired
Information to aid in pagination.

Hide child attributes

​
page_info.end_cursor
string | nullrequired
When paginating forwards, the cursor to continue.

​
page_info.start_cursor
string | nullrequired
When paginating backwards, the cursor to continue.

​
page_info.has_next_page
booleanrequired
When paginating forwards, are there more items?

​
page_info.has_previous_page
booleanrequired
When paginating backwards, are there more items?

Create checkout configuration
Creates a new checkout configuration

Required permissions:

checkout_configuration:create
plan:create
access_pass:create
access_pass:update
checkout_configuration:basic:read
POST
/
checkout_configurations

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Body
application/json
CreateCheckoutSessionInputModePaymentWithPlan
CreateCheckoutSessionInputModePaymentWithPlanId
CreateCheckoutSessionInputModeSetup
Parameters for CreateCheckoutSession
Autogenerated input type of CreateCheckoutSession

​
plan
objectrequired
Pass this object to create a new plan for this checkout configuration

Show child attributes

​
affiliate_code
string | null
The affiliate code to use for the checkout configuration

​
currency
enum<string> | null
The currency to use for the configuration when in 'setup' mode. This is used to target which currency specific payment methods are available. If not provided, it will default to 'usd' when in setup mode.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
metadata
object
The metadata to use for the checkout configuration

​
mode
string
Allowed value: "payment"
​
payment_method_configuration
object
This currently only works for configurations made in 'setup' mode. The explicit payment method configuration for the checkout session. If not provided, the platform or company's defaults will apply.

Show child attributes

​
redirect_url
string | null
The URL to redirect the user to after the checkout configuration is created

Response

200

application/json
A successful response

A checkout configuration object.
    Can be used to create a reusable custom configuration for a checkout, including attaching plans, affiliates and custom metadata to the checkout.
    This configuration can be re-used by multiple users.
    All successful payments and memberships resulting from a checkout will contain the passed metadata.
​
id
stringrequired
The ID of the checkout configuration

Example:
"ch_xxxxxxxxxxxxxxx"

​
company_id
stringrequired
The ID of the company to use for the checkout configuration

​
mode
enum<string>required
The mode of the checkout session.

Available options: payment, setup 
​
currency
enum<string> | nullrequired
The currency to use for the configuration when in 'setup' mode. This is used to target which currency specific payment methods are available. If not provided, it will default to 'usd' when in setup mode.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
plan
objectrequired
The plan to use for the checkout configuration

Show child attributes

​
affiliate_code
string | nullrequired
The affiliate code to use for the checkout configuration

​
metadata
objectrequired
The metadata to use for the checkout configuration

​
redirect_url
string | nullrequired
The URL to redirect the user to after the checkout configuration is created

​
purchase_url
stringrequired
A URL you can send to customers to complete a checkout. It looks like /checkout/plan_xxxx?session={id}

​
payment_method_configuration
objectrequired
The explicit payment method configuration for the session, if any. This currently only works in 'setup' mode. Use the plan's payment_method_configuration for payment method.

Hide child attributes

​
payment_method_configuration.enabled
enum<string>[]required
An array of payment method identifiers that are explicitly enabled. This means these payment methods will be shown on checkout. Example use case is to only enable a specific payment method like cashapp, or extending the platform defaults with additional methods.

The different types of payment methods that can be used.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
payment_method_configuration.disabled
enum<string>[]required
An array of payment method identifiers that are explicitly disabled. Only applies if the include_platform_defaults is true.

The different types of payment methods that can be used.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
payment_method_configuration.include_platform_defaults
booleanrequired
Whether Whop's platform default payment method enablement settings are included in this configuration. The full list of default payment methods can be found in the documentation at docs.whop.com/payments.

Checkout configurations
Retrieve checkout configuration
Retrieves a checkout configuration by ID

Required permissions:

checkout_configuration:basic:read
GET
/
checkout_configurations
/
{id}

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the checkout configuration

Example:
"ch_xxxxxxxxxxxxxxx"

Response

200

application/json
A successful response

A checkout configuration object.
    Can be used to create a reusable custom configuration for a checkout, including attaching plans, affiliates and custom metadata to the checkout.
    This configuration can be re-used by multiple users.
    All successful payments and memberships resulting from a checkout will contain the passed metadata.
​
id
stringrequired
The ID of the checkout configuration

Example:
"ch_xxxxxxxxxxxxxxx"

​
company_id
stringrequired
The ID of the company to use for the checkout configuration

​
mode
enum<string>required
The mode of the checkout session.

Available options: payment, setup 
​
currency
enum<string> | nullrequired
The currency to use for the configuration when in 'setup' mode. This is used to target which currency specific payment methods are available. If not provided, it will default to 'usd' when in setup mode.

Available options: usd, sgd, inr, aud, brl, cad, dkk, eur, nok, gbp, sek, chf, hkd, huf, jpy, mxn, myr, pln, czk, nzd, aed, eth, ape, cop, ron, thb, bgn, idr, dop, php, try, krw, twd, vnd, pkr, clp, uyu, ars, zar, dzd, tnd, mad, kes, kwd, jod, all, xcd, amd, bsd, bhd, bob, bam, khr, crc, xof, egp, etb, gmd, ghs, gtq, gyd, ils, jmd, mop, mga, mur, mdl, mnt, nad, ngn, mkd, omr, pyg, pen, qar, rwf, sar, rsd, lkr, tzs, ttd, uzs, rub, btc, cny 
​
plan
objectrequired
The plan to use for the checkout configuration

Show child attributes

​
affiliate_code
string | nullrequired
The affiliate code to use for the checkout configuration

​
metadata
objectrequired
The metadata to use for the checkout configuration

​
redirect_url
string | nullrequired
The URL to redirect the user to after the checkout configuration is created

​
purchase_url
stringrequired
A URL you can send to customers to complete a checkout. It looks like /checkout/plan_xxxx?session={id}

​
payment_method_configuration
objectrequired
The explicit payment method configuration for the session, if any. This currently only works in 'setup' mode. Use the plan's payment_method_configuration for payment method.

Hide child attributes

​
payment_method_configuration.enabled
enum<string>[]required
An array of payment method identifiers that are explicitly enabled. This means these payment methods will be shown on checkout. Example use case is to only enable a specific payment method like cashapp, or extending the platform defaults with additional methods.

The different types of payment methods that can be used.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
payment_method_configuration.disabled
enum<string>[]required
An array of payment method identifiers that are explicitly disabled. Only applies if the include_platform_defaults is true.

The different types of payment methods that can be used.

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 
​
payment_method_configuration.include_platform_defaults
booleanrequired
Whether Whop's platform default payment method enablement settings are included in this configuration. The full list of default payment methods can be found in the documentation at docs.whop.com/payments.


List payment methods
A payment method is a stored representation of how a customer intends to pay, such as a card, bank account, or digital wallet. It holds the necessary billing details and can be attached to a member for future one-time or recurring charges. This lets you reuse the same payment credentials across multiple payments.

Required permissions:

member:payment_methods:read
GET
/
payment_methods

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Query Parameters
​
after
string | null
Returns the elements in the list that come after the specified cursor.

​
before
string | null
Returns the elements in the list that come before the specified cursor.

​
first
integer | null
Returns the first n elements from the list.

Example:
42

​
last
integer | null
Returns the last n elements from the list.

Example:
42

​
member_id
stringrequired
The ID of the Member to list payment methods for

Example:
"mber_xxxxxxxxxxxxx"

​
direction
enum<string> | null
The direction to sort the payment methods by

Available options: asc, desc 
​
created_before
string<date-time> | null
The maximum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

​
created_after
string<date-time> | null
The minimum creation date to filter by

Example:
"2023-12-01T05:00:00.401Z"

Response

200

application/json
A successful response

The connection type for PaymentMethodInterface.

​
data
(BasePaymentMethod · object | CardPaymentMethod · object | UsBankAccountPaymentMethod · object | CashappPaymentMethod · object | IdealPaymentMethod · object | SepaDebitPaymentMethod · object)[]required
A list of nodes.

A payment method with no additional properties

BasePaymentMethod
CardPaymentMethod
UsBankAccountPaymentMethod
CashappPaymentMethod
IdealPaymentMethod
SepaDebitPaymentMethod
Show child attributes

​
page_info
objectrequired
Information to aid in pagination.

Hide child attributes

​
page_info.end_cursor
string | nullrequired
When paginating forwards, the cursor to continue.

​
page_info.start_cursor
string | nullrequired
When paginating backwards, the cursor to continue.

​
page_info.has_next_page
booleanrequired
When paginating forwards, are there more items?

​
page_info.has_previous_page
booleanrequired
When paginating backwards, are there more items?

Retrieve payment method
A payment method is a stored representation of how a customer intends to pay, such as a card, bank account, or digital wallet. It holds the necessary billing details and can be attached to a member for future one-time or recurring charges. This lets you reuse the same payment credentials across multiple payments.

Required permissions:

member:payment_methods:read
GET
/
payment_methods
/
{id}

Try it
Authorizations
​
Authorization
stringheaderrequired
The app API key from an app from the /dashboard/developer page

Path Parameters
​
id
stringrequired
The ID of the PaymentMethod

Example:
"payt_xxxxxxxxxxxxx"

Query Parameters
​
member_id
stringrequired
The ID of the Member associated with the PaymentMethod

Example:
"mber_xxxxxxxxxxxxx"

Response

200

application/json
A successful response

BasePaymentMethod
CardPaymentMethod
UsBankAccountPaymentMethod
CashappPaymentMethod
IdealPaymentMethod
SepaDebitPaymentMethod
A payment method with no additional properties

​
typename
stringrequired
The typename of this object

Allowed value: "BasePaymentMethod"
​
id
stringrequired
The ID of the payment method

​
created_at
string<date-time>required
When the payment method was created

Example:
"2023-12-01T05:00:00.401Z"

​
payment_method_type
enum<string>required
The type of the payment method

Available options: acss_debit, affirm, afterpay_clearpay, alipay, alma, amazon_pay, apple_pay, au_becs_debit, bacs_debit, bancontact, billie, blik, boleto, card, cashapp, crypto, eps, fpx, giropay, google_pay, grabpay, ideal, kakao_pay, klarna, konbini, kr_card, link, mobilepay, multibanco, naver_pay, nz_bank_account, oxxo, p24, pay_by_bank, payco, paynow, pix, promptpay, revolut_pay, samsung_pay, satispay, sepa_debit, sofort, swish, twint, us_bank_account, wechat_pay, zip, bizum, capchase_pay, kriya, mondu, ng_wallet, paypay, sequra, scalapay, vipps, custom, customer_balance, gopay, mb_way, ng_bank, ng_bank_transfer, ng_card, ng_market, ng_ussd, paypal, payto, qris, rechnung, south_korea_market, kr_market, shopeepay, upi, sunbit, netbanking, id_bank_transfer, demo_pay, shop_pay, sezzle, coinbase, splitit, platform_balance, apple, venmo, unknown 