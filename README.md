<div align="center">
  <h1> Evmos Apps Frontend </h1>
</div>

<div align="center">
  <a href="https://github.com/evmos/apps/blob/main/LICENSE">
    <img alt="License: ENCL-1.0" src="https://img.shields.io/badge/license-ENCL--1.0-orange" />
  </a>
  <a href="https://discord.gg/evmos">
    <img alt="Discord" src="https://img.shields.io/discord/809048090249134080.svg" />
  </a>
  <a href="https://twitter.com/EvmosOrg">
    <img alt="Twitter Follow Evmos" src="https://img.shields.io/twitter/follow/EvmosOrg"/>
  </a>
</div>

The frontend of [Evmos Dashboard Apps](https://app.evmos.org). It contains apps to manage assets, staking and governance.

> https://app.evmos.org

## Repositories

- [Evmos Apps Frontend](https://github.com/evmos/apps)
- [Evmos Apps Backend](https://github.com/evmos/backend)

## Documentation

Pre-requisites:

- [Node.js](https://nodejs.org/en/download/) (v18.12.0 or higher)
- [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Environment variables

The constants needed to run this project are located on `packages/evmos-wallet/src/internal/wallet/functionality/networkConfig.ts`.

The constants are setup to read from environment variables but there are also fallback default values hardcoded in this file.

If you need to change the value of any of these constants we recommend the following:

1. Copy the `.env.example` file located on the root directory into the base directory of the app you want to use with the name `.env.local`
   - For example: If you are working on the assets page copy this file in the path: `apps/assets`.
   - Note: if you are working with multiple apps you need to copy this file into every app you are using
2. Change the value of the env variables in the .env.local file you copied into the apps folder
3. Build and run the apps as highlighted by the instructions above

## Community

The following chat channels and forums are a great spot to ask questions about Evmos:

- [Evmos Twitter](https://twitter.com/EvmosOrg)
- [Evmos Discord](https://discord.gg/evmos)
- [Evmos Forum](https://commonwealth.im/evmos)

## Contributing

Looking for a good place to start contributing?
Check out some
[`good first issues`](https://github.com/evmos/apps/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

For additional instructions, standards and style guides, please refer to the [Contributing](./CONTRIBUTING.md) document.

## Careers

See our open positions on [Greenhouse](https://boards.eu.greenhouse.io/evmos).

## Disclaimer

The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.

## Licensing

Starting from April 21th, 2023, this repository will update its license to Evmos Non-Commercial License 1.0 (ENCL-1.0). For more information see [LICENSE](/LICENSE).

### SPDX Identifier

The following header including a license identifier in SPDX short form has been added in all ENCL-1.0 files:

```js
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
```

### License FAQ

Find below an overview of Permissions and Limitations of the Evmos Non-Commercial License 1.0. For more information, check out the full ENCL-1.0 FAQ [here](/LICENSE_FAQ.md).

| Permissions                                                                                                                                                                  | Prohibited                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| - Private Use, including distribution and modification<br />- Commercial use on designated blockchains<br />- Commercial use with Evmos permit (to be separately negotiated) | Commercial use, other than on designated blockchains, without Evmos permit |
