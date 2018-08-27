# Final Project: Online Marketplace

## Understand

A basic online marketplace where shoppers can view and buy products. A product belongs to a storefront, owned by a store owner.

There are 3 types of users: Administrators, Store owners, Shoppers
- Administrators manage the store owners (list of approved addresses)
- Store owners can create storefronts, and populate them with products (each having a price and a stock count)
- Shoppers have access to all the storefronts content, and can pay to buy a specific product

## How-to run

### Prerequisites

Install [Truffle](https://truffleframework.com/): a development framework to help write, test & deploy Ethereum smart contracts
```
npm install truffle -g
```

Install [Ganache](https://truffleframework.com/ganache): a simple tool to run an Ethereum blockchain locally

### Run

```
truffle compile
truffle migrate
truffle test
```

Run a local development server to serve the frontend of the application (can use [lite-server](https://www.npmjs.com/package/lite-server))

## Additional info

### Design patterns decisions

see `design_pattern_decisions.md`

### Avoiding common attacks

see `avoiding_common_attacks.md`
