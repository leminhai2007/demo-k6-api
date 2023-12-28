# demo-k6

for demo only

## Installation

MacOS
```
brew install k6
```
Windows
```
winget install k6 --source winget
```
**Install xk6 extension (must install [Go toolchain](https://go.dev/doc/install) first)**
```
go install go.k6.io/xk6/cmd/xk6@latest
xk6 build --with github.com/szkiba/xk6-csv@latest
xk6 build --with github.com/szkiba/xk6-dotenv@latest
```

## Run k6

Create new script
```
k6 new
```
Run script
```
k6 run scenario.js
```
Run script with xk6 extension (after build another k6 binary with dashboard extension)
```
.\k6.exe run scenario.js