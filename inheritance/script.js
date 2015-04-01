readAndWrite();

//__proto__ usage example
function protoExample() {
    var man, student;

    man = {
        name: "Ivan",
        age : 20
    };
    student = {
        university : "BSU"
    };
    student.__proto__ = man;

    console.log(student.university, student.name, student.age);
}

//prototype property read & write
function readAndWrite() {
    var man, student;

    man = {
        name: "Ivan",
        age : 20
    };
    student = {
        university : "BSU"
    };
    student.__proto__ = man;

    student.name = "Petr";
    delete student.age;
    console.log(student.university, student.name, student.age);
}

function objectCreateExample() {
    var emptyMan = Object.create(null),
        man = Object.create({ a : 1 }),
        kid = Object.create(man);

    console.log(kid.a);
}

function createExample() {
    var emptyMan = create(null),
        man = create({ a : 1 }),
        kid = create(man);

    console.log(kid.a);
}

//create implementation
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}

function prototypeExample() {
    var man,
        student,
        newStudent;

    man = new Man();
    Student.prototype = man;
    student = new Student();

    console.log(student.university, student.name, student.age);

    Student.prototype = {};
    newStudent = new Student();

    console.log(student.university, student.name, student.age);
    console.log(newStudent.university, newStudent.name, newStudent.age);
}

function Man() {
    this.name = "Ivan";
    this.age = 20;
}

function Student() {
    this.university = "BSU";
}