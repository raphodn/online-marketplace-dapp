# Final Project: Online Marketplace

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Understand](#understand)
- [How-to run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Run](#run)
    - [Tests](#tests)
    - [Frontend (nothing to see sadly)](#frontend-nothing-to-see-sadly)
- [Additional info](#additional-info)
  - [Design patterns decisions](#design-patterns-decisions)
  - [Avoiding common attacks](#avoiding-common-attacks)
  - [Future improvements](#future-improvements)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Understand

A basic online marketplace where shoppers can view and buy products. A product belongs to a storefront, owned by a store owner.

There are 3 types of users: Administrators, Store owners, Shoppers
- Administrators manage the store owners (list of approved addresses)
- Store owners can create storefronts, and populate them with products (each having a price and a stock count)
- Shoppers have access to all the storefronts content, and can pay to buy a specific product

The Solidity code is seperated into 3 different smart contracts:
- `OnlineMarketplace`: where the Admin business logic is specified
- `StoreOwner`: where an owner can manage his stores
- `Store`: logic specific to a marketplace store, including add/removing products

## How-to run

### Prerequisites

Intall `node.js` & `npm`

Install [Truffle](https://truffleframework.com/): a development framework to help write, test & deploy Ethereum smart contracts
```
npm install truffle -g
```

Install [Ganache](https://truffleframework.com/ganache): a simple tool to run an Ethereum blockchain locally

### Run

#### Tests

```
truffle compile
truffle migrate
truffle test
```

#### Frontend (nothing to see sadly)

```
npm install
npm run start
```

## Additional info

### Design patterns decisions

see `design_pattern_decisions.md`

### Avoiding common attacks

see `avoiding_common_attacks.md`

### Future improvements

Due to a complete lack of time, I did not finish the frontend part, nor did I deploy it on IPFS. I nevertheless enjoyed designing and testing the different contracts. This code was done in less than a day, so it is probably not bug free (even though all the tests pass !)

Some ideas I had:
- add product image and description (stored on IPFS, hash stored in the blockchain)
- possibility to tag and categorise products
- store product createdAt and updatedAt timestamps for ordering choice in the frontend
- feature to order a product in multiple quantity
- MongoDB cache database to improve search functionality (instead of search through event logs)
