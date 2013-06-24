Regulate for Meteor
===================

A versatile validation library for the client and server.

View the main project here: http://github.com/eddflrs/regulate.js

View a sample meteor project here: http://github.com/eddflrs/regulate-meteor-demo

Install via Meteorite
---------------------

```bash
$: mrt add regulate.js
```

Basic Usage
-----------

The form:

```html
<form id="sampleForm">
  <input type='text' name='username'/>
  <p id='username-error'></p>

  <input type='password' name='password1'/>
  <p id='password1-error'></p>
  
  <input type='password' name='password2'/>
  <p id='password2-error'></p>
  
  <input type='text' name='email'/>  
  <p id='email-error'></p>
    
  <input type='file' name='profileImage'/>
  <p id='profileImage-error'></p>
  
  <input type='submit'/>
</form>
```

The validation requirements can be shared by client and server by placing them in `lib/validations.js` or anywhere else outside of the `client` and `server` folders.


```js

Regulate('registerUser', [
  {
    name: 'username',
    min_length: 3,
    max_length: 5,
    display_as: 'Username',
    display_error: '#username-error'
  }, {
    name: 'password1',
    min_length: 5,
    max_length: 12,
    display_as: 'Password',
    display_error: '#password1-error'
  }, {
    name: 'password2',
    match_field: 'password1',
    display_as: 'Confirmation',
    display_error: '#password2-error'
  }, {
    name: 'email',
    email: true,
    display_as: 'Email',
    display_error: '#email-error'
  }, {
    name: 'profileImage',
    max_size: 1024 * 10, //10kb
    accepted_files: 'jpeg|png',
    display_as: 'Profile image',
    display_error: '#profileImage-error'
  }
]);

```

On the **client side**, register an onSubmit callback to get validation results:

```js

Meteor.startup(function () {
  Regulate.registerUser.onSubmit(function (error, data) {
    if (error) {
      console.log('Validation failed. These are the errors: ', error);
    } else {
      console.log('Validation passed. This is the data: ', data);
      // Send the data over to the server via an exposed Meteor method:
      Meteor.call('registerUser', data);
    }
  });
});

```

On the **server side**, expose an RPC method that will validate the form data:

```js

Meteor.methods({
  registerUser: function (data) {
    Regulate.registerUser.validate(data, function (error, data) {
      if (error) {
        console.log('Server side validation failed.');
      } else {
        console.log('Server side validation passed!');
        // Save data to database or whatever...
      }
    });
  }
});

```

For more
--------

Have a look at the main project's repo for more details on what rules are supported and how to register custom validation requirements.

http://github.com/eddflrs/regulate.js 

For a meteor demo project: http://github.com/eddflrs/regulate-meteor-demo
