# WdioProject
### Requirement

Typescript: [https://docs.microsoft.com/en-us/learn/modules/typescript-get-started/](https://docs.microsoft.com/en-us/learn/modules/typescript-get-started/)

Cypress: [https://docs.cypress.io/guides/getting-started/installing-cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)

Allure: https://docs.qameta.io/allure/

#### Prerequisite - (Install All Dependencies)
``npm install``

### Test stack used : 
- `Cypress` : Cypress is a progressive automation framework built to automate modern Web and API applications
- `Chai` : Chai is a BDD / TDD assertion library for node and the browser
- `npm` - Package management

### Available Environments

- staging
- prod

### Browser Support

- CHROME
- FIREFOX

### To execute Tests in Local

The list of services and environmnet available are mentioned above, these are case sensitive.
For the test execution we need to set the environment,
The tests are ran against the `staging` environment in pipeline

```sh
$ export ENV=staging
```

### How tests are executed as part of Pipeline

1. In pipeline, The tests are being execute via the `execute-test.sh` with `<environment>` 1st parameter, `<browser>` as the 2nd parameter, optional `<tag>` cucumber tags as 3rd paratmeter.

2. Select Environment type, 2 options are available
    - staging(default)
    - prod 

<img width="329" alt="Screenshot 2023-01-21 at 10 39 02 PM" src="<img width="322" alt="image" src="https://github.com/kishank1946/orangeHRM_project/assets/85667476/c5a6f43e-6f10-4150-baf8-4e8d832b820e">">

3. Select Browser, 2 Browser types are supported
    - CHROME (default)
    - FIREFOX

4. Cucumber Tags, `All` is default tag

5. Click on `Run WorkFlow`


### Example to run tests for specific tag local

To run the `All` feature tests
```
npm run test:staging
```

run the test for `staging` environment

```
npm run test:staging
```
for `production`
```
npm run test:prod
```

to run particular file `directory`

```
npm run test:staging login
```


to run the test `headless` mode

```
npm run test:staging login Yes
```

run the test for particular `browser`

```
npm run test:staging login No FIREFOX
```
  
run the test for particular `URL`

```
npm run test:staging login No CHROME www.google.com
```

to open the `Allure Report` 

```
npm run report
```



