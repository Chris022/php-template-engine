# Syntax
This sheet defines the supported syntax. The used syntax is based on: https://www.php.net/manual/en/language.control-structures.php

For detailt syntax description see syntax.xhtml or syntax.ebnf

## HTML Elements
All Normal HTML tags are supported

```html
<html>
    <body>
        <div>
            <p>This is an example</p>
        </div>
    </body>
</html>
```

## Data
The Engine does not allow to set Data in your templates! Instead it needs one file, that stores and sets all the data. The File has to look something like that:

```php
extract([
    "firstname": "Christoph"
    "lastname": "Weber"
])
```

The Engine supports the following data types as data:
    String: "Text"
    Numbers: 1.34
    Arrays: ["Text",1.45]
    Objects: ["test"=>"hallo","test2"=>1]

INFO: use extract() to extrakt data input https://www.php.net/manual/en/function.extract.php

## Variables
```php
<p><?=$firstname?> <?=$lastname?></P>
```

## Nested Inputobjects
```php
<p><?=$person["firstname"]?> <?=$person["lastname"]?></P>
```

## IF


## FOR

-- support for: "continue" & "break"

## FOREACH

## INCLUDE


## 




