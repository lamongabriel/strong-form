# Strong Form 💪💪

## Strong form is a front-end form validator made with JavaScript ES6
Made using javascript with webpack, babel to transpile it and SASS, this validator have a lot of form types to test it's inputs.
Using ESModules to split archives and a brazilian API request to validate adress fields.

## How to use it?
To use it you'll need to add a "strong-form" attribute to your html input, select or textarea field.
All strong-form attributes are required, if you don't want to validate a field, just leave it empty.
Fields without a specific validation, just need a field type=required to be mandatory.
To use more than one verification, you'll need to use "|" as a divider for the tags.

```<input type="date" name="birthday" id="birthday" strong-form="type=birthday|type=required">```

###### type=required
```strong-form="type=required"```
This field is going to be required for the form to work
  
###### type=cep
```strong-form="type=cep"```
This field is going to be validated via Brazil's regional state code, called CEP, via [Brasil CEP API](https://brasilapi.com.br/).
You can automate this field by adding type=neighborhood, type=street, type=uf to other fields to auto fill this inputs.
  
###### type=sex
```strong-form="type=sex"```
Verify either it's value == to "male" or "female", thought you could add more fields.

###### type=birthday
```strong-form="type=birthday"```
Verify if its a valid birthday date type.

###### type=email
```strong-form="type=email"```
Verify if its a valid e-mail.

###### type=passconfirmation
```strong-form="type=passconfirmation"```
This field verifies if the type=pass is equal to it, must be used with a ```strong-form="type=passconfirmation```.

###### type=minlength
```strong-form="minlength=xx"```
Minimun lenght of a input field.

###### type=maxlength
```strong-form="maxlength=xx"```
Maximum lenght of a input field.
