## Step 5 - Querying The Database

Now that we have set up the driver and have successfully connected to the neo4j aura instance, it's important to learn how to use and interact with our database
from this point.

First, a basic understanding of Cypher would be extremely helpful. This tutorial will cover some simple ideas and examples, but for a more in-depth instruction on
Cypher please see Neo4j's official driver-based [Cypher manual](https://neo4j.com/docs/javascript-manual/current/query-simple/).

Let's make an example with seven nodes, which can be people or classes. The people can be either be teachers or students. Each person will have a name and age.
Each class will have a name and class code. There are relationships to show who is in what class and who teaches each class.

We want to represent that:

Carly, Bruce, and Blake are students in Algebra class.
Paul, Rachel, and Polly are students in Geometry class.
Mr. Mitchel teaches both Algebra and Geometry.

To **create** new nodes in our database, we use the Cypher MERGE function. In our code, we will be using the write function from our driver file to run this MERGE 
Cypher code.

The basic format for using MERGE looks like this: MERGE ( :Label {property: value} )

For example, we could create our nodes like this:

```
await write( "MERGE (:Class {name: 'Algebra', classCode: 'MAT 112'} )" )
await write( "MERGE (:Class {name: 'Geometry', classCode: 'MAT 107'} )" )
await write( "MERGE (:Person:Student {name: 'Carly', age: 18} )" )
await write( "MERGE (:Person:Student {name: 'Bruce', age: 19} )" )
await write( "MERGE (:Person:Student {name: 'Blake', age: 18} )" )
await write( "MERGE (:Person:Student {name: 'Paul', age: 21} )" )
await write( "MERGE (:Person:Student {name: 'Rachel', age: 21} )" )
await write( "MERGE (:Person:Student {name: 'Polly', age: 20} )" )
await write( "MERGE (:Person:Teacher {name: 'Mr. Mitchel', age: 57} )" )
```

In more practical use, it is likely that user input will affect what sorts of properties we want to give to a node. This is an example using variables outside the line
of code itself:

```
let person = { name: 'Carly', age: 18 }
await write( "MERGE (:Person:Student {name: $person.name, age: $person.age} )" )
```

Then, we want to create the **relationships** between our nodes.

Finally, we will want to read from our database.
