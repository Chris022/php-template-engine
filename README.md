# php-template-engine

A Template Engine that uses a subset of PHP as its syntax. This enables templates written in this language to be used just as they are in PHP.
For syntax docu check "syntax.xhtml" or "syntax.ebnf"

## Usage

```ts
    import {template, template_from_file} from "php-template-engine"

    //Allows you to input code as a string
    template("...")

    //Allows you to run code from a file
    template_from_file("...")
```

## Subset

### Data


### Datatypes
The following Datatyes are supported
* String: "Text"
* Numbers: 1.34
* Boolean: True / False 
* Arrays: ["Text",1.45]
* Objects: ["test"=>"hallo","test2"=>1]

### Variables
Variables can be echoed using the following Syntax:
```php
<?= $firstname ?> <?= $lastname ?>
<?= $countries["austria"] ?>
```
The Engine does not allow to change or define Variablees in your templates! Instead you should include a seperate file in which you use the extract function to make variables available
```php
<?php 
extract([
    "firstname": "Christoph"
    "lastname": "Weber"
])
?>
```

### Include
Other files can be included using the following syntay
```php
<?php include 'file.php'; ?>
```
### BinaryOperators
The following binary-operators are supported:
* ==
* ===
* !=
* !==
* <
* >
### UnaryOperators
The following unary-operators are supported:
* ++
* --

### Controlstructures

#### __IF__
```php
<?php if($test=="test"): ?>
    //....
<?php endif; ?>
```

#### __FOR__
```php
<?php for($i=0;$i<10;$i++): ?>
    //....
<?php endfor; ?>
```

#### __FOREACH__
```php
<?php foreach($i as $key=>$value): ?>
    //....
<?php endforeach; ?>
```

#### __Continue__
Can be used to skip to the next iteration of a for and foreach loop
```php
<?php continue; ?>
```

#### __Break__
Can be used to exit out of a for and foreach loop
```php
<?php break; ?>
```
