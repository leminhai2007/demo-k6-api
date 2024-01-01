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

### Create new script
```
k6 new
```
### Run script
```
k6 run scenario.js
```
### Run script and stream result to Grafana Cloud

Add token from Grafana Cloud
```
k6 login cloud --token <your token>
```
Run script with option --out
```
k6 run --out cloud scenario.js
```
### Run script and stream result to local Grafana TimescaleDB docker

Build docker compose
```
docker compose -f .\docker-compose-timescaledb.yml up
```
Build k6 with xk6
```
xk6 build --with github.com/grafana/xk6-output-timescaledb@latest
```
Run script
```
.\k6.exe run scenario.js -o timescaledb=postgresql://k6:k6@localhost:5432/k6
```
Go to Grafana
```
http://localhost:3000/
admin/admin
```