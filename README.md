# rule-validation-api
A task to create a simple rule-validation API

First route is the base route. HTTPS GET "/"

Live link here >>> https://rule-api.herokuapp.com


Second route is the rule validation route. HTTPS POST "/validate-rule"
The route should accept JSON data containing a rule and data field to validate the rule against.

Example of accepted payload: 
{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}