# HODL contracts

Run tests:

Create a .env file and place your private key there. Example is in .env_sample file. Then, run this command:

```bash
npx hardhat test
```

Deploy ERC20:

```bash
npx hardhat TASK_DEPLOY_ERC20_WITH_MINT --network <network>
```

Deploy vault factory:

```bash
npx hardhat TASK_DEPLOY_VAULT_FACTORY --network <network>
```

# Licensing

The primary license for HODL industries is the Business Source License 1.1 (BUSL-1.1), see LICENSE. However, some files are licensed under MIT
