
SMARTERP DATABASE DESIGN

STEP 1:
Main Entities

1. Users
2. Companies
3. Groups
4. Ledgers
5. Stock Groups
6. Units
7. Stock Items
8. Customers
9. Suppliers
10. Vouchers
11. Voucher Entries
12. Inventory Transactions
13. Invoices
14. Audit Logs

Entity Meaning

Users = People who can login

Companies = Businesses managed inside SmartERP

Groups = Accounting categories

Ledgers = Individual accounts

Stock Groups = Product categories

Units = PCS, KG, BOX, LTR

Stock Items = Products

Customers = People who buy products

Suppliers = People who sell products to us

Vouchers = Business transactions

Voucher Entries = Accounting entries inside vouchers

Inventory Transactions = Stock movement records

Invoices = Bills generated for customers

Audit Logs = Activity history


STEP 2:
TABLE: users

id
name
email
password
created_at
updated_at


STEP 3:
TABLE: companies

id
user_id
company_name
address
gst_number
financial_year
state
contact_number
created_at
updated_at

Relationship:

One User
    ↓
Many Companies


STEP 4:
TABLE: groups

id
company_id
group_name
group_type
created_at
updated_at


STEP 5:
TABLE: ledgers

id
company_id
group_id
ledger_name
opening_balance
current_balance
created_at
updated_at


STEP 6:
TABLE: stock_groups

id
company_id
group_name
created_at
updated_atTABLE: stock_groups

id
company_id
group_name
created_at
updated_at


STEP 7:
TABLE: units

id
company_id
unit_name
symbol
created_at
updated_at


STEP 8:
TABLE: stock_items

id
company_id
stock_group_id
unit_id
item_name
sku
purchase_price
selling_price
quantity
gst_percentage
created_at
updated_at


STEP 9:
TABLE: customers

id
company_id
ledger_id
name
mobile
address
outstanding_balance
created_at
updated_at


STEP 10:
TABLE: vouchers

id
company_id
voucher_type
voucher_number
voucher_date
narration
total_amount
created_by
created_at
updated_at


STEP 11:
TABLE: voucher_entries

id
voucher_id
ledger_id
debit_amount
credit_amount
created_at
updated_at


STEP 12:
TABLE: inventory_transactions

id
company_id
stock_item_id
voucher_id
transaction_type
quantity
created_at
updated_at


STEP 13:
TABLE: invoices

id
company_id
customer_id
voucher_id
invoice_number
invoice_date
subtotal
gst_amount
grand_total
created_at
updated_at


STEP 14:
TABLE: audit_logs

id
user_id
action
table_name
record_id
created_at
