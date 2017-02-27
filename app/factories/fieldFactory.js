'use strict';

angular.module('fieldFactory', [])
    .factory('FieldValidationFactory', function() {

        return {
            // ____________________________________________________

            // Check That Field is not empty function
            checkFieldNotEmpty: function(fieldVal) {
                if ((fieldVal !== '') &&
                    (fieldVal !== undefined) &&
                    (fieldVal !== null)) {
                    return true;
                } else {
                    return false;
                }
            },

            // ____________________________________________________

            // Check that an email address is valid
            emailRegex: function(fieldVal) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(fieldVal);
            },

            checkValidEmail: function(fieldVal) {
                if (this.emailRegex(fieldVal) != false) {
                    return true;
                } else {
                    return false;
                }
            },

            // ____________________________________________________

            // Phone number regex function
            phoneNumberRegex: function(fieldVal) {
                var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                return re.test(fieldVal);
            },

            // Validate that 10 digit phone number is true
            checkValidPhoneNumber: function(fieldVal) {
                if ((this.phoneNumberRegex(fieldVal) != false) &&
                    (fieldVal !== '') &&
                    (fieldVal !== undefined) &&
                    (fieldVal !== null)) {
                    return true;
                }
                else {
                    return false;
                }
            },

            // ____________________________________________________

            // Validate that field is a number integer
            checkNumberValue: function(fieldVal) {
                if ((Number.isInteger(fieldVal)) &&
                    (fieldVal !== '') &&
                    (fieldVal !== undefined) &&
                    (fieldVal !== null)) {
                    return true;
                }
                else {
                    return false;
                }
            },

            // ____________________________________________________

            // Check Zip Code String Length
            checkZipCode: function(fieldVal) {
                var zipVal = fieldVal;
                if (((/^\s*\d{5}\s*$/.test(zipVal)) != false) &&
                    (fieldVal !== '') &&
                    (fieldVal !== undefined) &&
                    (fieldVal !== null)) {
                    return true;
                } else {
                    return false;
                }
            }

        };

    });
