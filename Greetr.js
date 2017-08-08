
// Putting all of the code in an IIFE
// To avoid collision with other existing variables 😙

;(function(global, $) {

  // Returning the Object constructor "new"
  // Allowing to create Greetr object without using "new" 🔩
  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  };

  // NOTE: All of these variables are hidden within the scope of the IIFE
  // It's to secure these datas 🔒

  // Supported languages 🇪🇸 🇬🇧
  var supportedLanguages = ['en', 'es'];

  // Informal greetings 💬
  var greetings = {
    en: "Hello",
    es: "Hola"
  };

  // Formal greetings 👔
  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  // Loging messages 📳
  var logMessages = {
    en: "Logged in",
    es: "Inició sesión"
  }


  // Adding all the methods to the prototype
  // NOTE: It's a good practice 👌
  // Because we're not recreating them at each Greetr instantiation
  // It's better for performance 💯
  Greetr.prototype = {

    fullname: function() {
      return this.firstname + ' ' + this.lastname;
    },

    // Checking if language is valid 👅
    validate: function() {
      if(supportedLanguages.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstname + ' !';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ' ' + this.fullname();
    },

    greet: function(formal) {
      var message;

      if(formal) {
        message = this.formalGreeting();
      } else {
        message = this.greeting();
      }

      if (console) {
        console.log(message);
      }

      // "this" refers to the calling object at execution time
      // making the method chainable 🔄
      return this;
    },

    log: function() {
      if(console) {
        console.log(logMessages[this.language] + ' : ' + this.fullname());
      } else {
        alert("If you're on Internet Explorer, open the console please");
      }

      return this;
    },

    setLanguage: function(newLanguage) {
      if(this.validate(newLanguage)) {
        this.language = newLanguage;
      }

      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if(!$) {
        throw 'jQuery not loaded';
      }

      if(!selector) {
        throw 'Missing jQuery selector';
      }

      var message;

      if(formal) {
        message = this.formalGreeting();
      } else {
        message = this.greeting();
      }

      $(selector).html(message);

      return this;
    }

  };

  Greetr.init = function(firstname, lastname, language) {
    var self = this;

    self.firstname = firstname || 'Default firstname';
    self.lastname = lastname || 'Default lastname';
    self.language = language || 'en';
  };

  Greetr.init.prototype = Greetr.prototype;

  global.Greeter = global.G$ = Greetr;

}(window, jQuery));
