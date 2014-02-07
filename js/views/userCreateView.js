var View = require("./view");
var template = require("./templates/userCreate");
var PolisStorage = require("./util/polisStorage");
var $ = require("jquery");

modules.exports = View.extend({
    name: "userCreateView",
    template: template,
    events: {
      "submit form": function(event){
        var that = this;
        event.preventDefault();
        var urlPrefix = "https://www.polis.io/";
        if (-1 === document.domain.indexOf(".polis.io")) {
            urlPrefix = "http://localhost:5000/";
        }
        this.serialize(function(attrs, release){
          // Incorporate options, like zinvite.
          attrs = $.extend(that.options || {}, attrs);

          $.ajax({
            url: urlPrefix + "v3/auth/new",
            type: "POST",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            // crossDomain: true,
            data: attrs
          }).then(function(data) {
            release();
            that.trigger("authenticated");
          }, function(err) {
              release();
              alert("login was unsuccessful");
          });
        });
      },
      "invalid": function(errors){
        console.log("invalid form input" + errors[0].name);
        console.log(errors);

       //_.each(errors, function(err){
          $("input[name=\""+errors[0].name+"\"]").closest("label").append(errors[0].message); // relationship between each input and error name
        //})
      }
    },
    validateInput: function(attrs){
      var errors = [];

      if(attrs.email === ""){
        errors.push({name: "description",  message: "hey there... you need an email"});
      }
      return errors;
    },
    initialize: function(options) {
      this.options = options;
    }
  });