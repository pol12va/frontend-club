test2();

//test 1
function test1() {
    var one = { name : "Ivan" },
        two = { name : "Petr" };

    speak.call(one);
    speak.call(two);
}

//test 2
function test2() {
    var one = { name : "Ivan" },
        two = { name : "Petr" };

    speakWithContext(one);
    speakWithContext(two);
}

function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, my name is " + identify.call(this);
    console.log(greeting);
}

function identifyWithContext(context) {
    return context.name.toUpperCase();
}

function speakWithContext(context) {
    var greeting = "Hello, my name is " + identify.call(context);
    console.log(greeting);
}

//test 3. This is not a function itself
function test3() {
    var i,
        foo = function(num) {
            console.log("foo: " + num);

            this.count++;
        };

    foo.count = 0;
    
    for (i = 0; i < 10; i++) {
        if (i > 5) {
            foo(i);
        }
    }

    console.log(foo.count);
}

//test 4. This is not a scope
function test4() {
    a = 5;
    var foo = function() {
            var a = 2,
                bar = function() {
                    console.log(this.a);
                };
            bar();
        };
    foo();
}

//test 5. Default binding. Code only. Use strict
function test5() {
    var foo = function() {
        console.log(this.a);
    };

    var a = 2;
    foo();
}

//test 6. Implicit binding
function test6() {
    var foo = function() {
            console.log(this.a);
        },
        obj = { 
            a : "object a",
            foo : foo
        }, bar;

    obj.foo();
    bar = obj.foo;
    bar(); // lost implicit binding
}

//test 7. Callback. Code only
function test7() {
    var foo = function() {
            console.log(this.a);
        },
        dooFoo = function(fn) {
            fn();
        },
        obj = { 
            a : "object a",
            foo : foo
        }, a = "Global";

    dooFoo(obj.foo);
}

//test 8. Explicit binding
function test8() {
    var foo = function() {
            console.log(this.a);
        },
        obj = { a : 2 };

    foo.call(obj);      //obj can be primitive
}

//test 9. Explicit > implicit
function test9() {
    var foo = function() {
            console.log(this.a);
        },
        obj1 = { a : 2, foo : foo },
        obj2 = { a : 3, foo : foo };

    obj1.foo();
    obj2.foo();

    obj1.foo.call(obj2);
    obj2.foo.call(obj1);
}

//test 10. New > implicit
function test10() {
    var foo = function(something) {
            this.a = something;
        }, 
        obj1 = { foo : foo },
        obj2 = {},
        bar;

    obj1.foo(2);
    console.log(obj1.a);

    obj1.foo.call(obj2, 3);
    console.log(obj2.a);

    bar = new obj1.foo(4);
    console.log(bar.a);
    console.log(obj1.a);
}