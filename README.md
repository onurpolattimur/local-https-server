# local-https-server

This repository provides a convenient script to generate SSL certificates using `mkcert` and automatically add the necessary records to your host file for local development.

## Prerequisites

Before you begin, make sure you have the following tools installed:

- [Homebrew](https://brew.sh/) (for macOS)
- [mkcert](https://github.com/FiloSottile/mkcert)

You can install `mkcert` using Homebrew:

```sh
brew install mkcert
```

```sh
sudo mkcert -install
```

## Usage
Clone this repository and navigate to its directory:

```sh
./build_certificate.sh <domain>
```
This script will generate SSL certificates for the specified domain using mkcert.

The script will also automatically add the necessary records to your host file.

The default port is `8443`, and you can access your app via `https://<domain>:8443`.
## Notes
The generated certificates are intended for local development purposes only.

Make sure to adjust your application's configuration to use these certificates for secure connections during development.

For more advanced configurations or deployment scenarios, refer to the official documentation of mkcert.
