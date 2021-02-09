***"isValid" does not work in "production" mode correctly for "useFieldArray"***

**Describe the bug**

`isValid` from `formState` behaves itself differently for `dev` mode and `production` build by using `useFieldArray`

- `dev` mode is launched by `react-scripts start`
- `production` mode is built by `react-scripts build` and served by any server. In my example it's `express` server

 

**To Reproduce**
Steps to reproduce the behavior:
- Please clone the git repo with [reproducible scenarios:](https://github.com/Travellerme/react-hook-form-issue)
- Make `npm install`
- Run `npm run dev:make-build-and-serve:run`

**First test-case**

1. Go to `localhost:8001` and check that `isValid: false` is shown on the bottom of page.
2. Enter any `Quantity` and `Product ID` for `Heading` section. `isValid` label will be changed to `true` 
3. Delete `Quantity` or `Product ID`. `isValid` label will be changed to `false`
4. Validation will be shown under the fieldname
5. Select `Heading2`. First `Heading` will be closed and inputs should be unmounted from DOM.
6. Enter any `Quantity` and `Product ID` for `Heading2` section. `isValid` label is still equal `false`.

![Prod First scenario gif](Prod_first_scenario.gif?raw=true "Prod First scenario")

**If you perform the same scenario but for `dev` mode (`npm start`), on the `6` step `isValid` will be changed to `true`**

![Dev First scenario gif](Dev_first_scenario.gif?raw=true "Dev First scenario")

**Second test-case**

1. Go to `localhost:8001` and check that `isValid: false` is shown on the bottom of page.
2. Enter `Quantity` OR `Product ID` for `Heading` section. Second field must be empty. 
3. Select `Heading2`. First `Heading` will be closed and inputs should be unmounted from DOM.
4. Enter any `Quantity` and `Product ID` for `Heading2` section. `isValid` label is still equal `false`.

![Prod Second scenario gif](Prod_second_scenario.gif?raw=true "Prod Second scenario")

**If you perform the same scenario but for `dev` mode (`npm start`), on the `4` step `isValid` will be changed to `true`**

![Dev Second scenario gif](Dev_second_scenario.gif?raw=true "Dev Second scenario")

**Codesandbox link (Required)**
I cannot include a codesandbox link, as this issue is reproducable only for `production` mode.
[Please check the github repo instead:](https://github.com/Travellerme/react-hook-form-issue)

**Expected behavior**
- `isValid` must behave itself equally for `production` and `dev` builds.
- For `production` build `isValid` must behave itself equally how it works for `dev` build. 

**Screenshots**
![Prod First scenario gif](Prod_first_scenario.gif?raw=true "Prod First scenario")
![Prod Second scenario gif](Prod_second_scenario.gif?raw=true "Prod Second scenario")

**Desktop (please complete the following information):**

- Windows 10 / Ubuntu / OS:
- Browser Chrome / Firefox / Safari
- Version 88.0.4324.150 / 85.0 / 13.1 (15609.1.20.111.8)

**Smartphone (please complete the following information):**

- was not tested

**Additional context**
This issue is reproducible only by using `useFieldArray`

`isDirty` and other flags are also affected
