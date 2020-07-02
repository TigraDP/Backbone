Backbone.Collection

The Backbone.Collection is nothing more than a group (collection) of models. This is necessary for convenient control of the data array.

Collection methods allow you to add items, delete and update them, clear the entire list at once or overwrite it with a new list, sort as you need, and so on.

Any event that is triggered on a model in a collection will also be triggered on the collection directly. This allows you to listen for changes to specific attributes in any model in a collection. You can also create custom events that will also work on collections.
Backbone has built-in collection methods. In addition, the list of methods has been supplemented by an Underscore library.

Underscore methods are integrated to the Backbone.Collection, so we can use them in the same way as the built-in methods in Backbone.

Thus, Backbone has over 50 methods which can be utilized within the Backbone.Collection class.

Let's start looking at the Backbone.Collection in details.
















"extend"


let's to create a simple collection and model for examples. To do this, we will use the "extend" method as for the model:

User = Backbone.Model.extend({
	defaults: {
	 	id: ‘ ‘,
		name: ‘ ‘,
		age: ‘ ‘
	}
});

user1 = new User({
	id: 1,
	name: 'Ivan',
	age: 25
});

user2 = new User({
	id: 2,
	name: 'Vasya',
	age: 33
});


UserCollection = Backbone.Collection.extend({});


A collection can be instantiated by using the "new" keyword.


newUserCollection = new UserCollection();


Congratulations! We created our first Backbone.Collection!
We can create an empty collection and then add the model objects to it later or we can pass a few model objects in the collection while creating it.
Also we can add to collection another collections.
"model"

We can override property "model" to specify the model class and pass raw attributes objects with add, create, and reset options:

newUserCollection = new UserCollection({
	model: User
});


"add", "push", "unshift" 

So, we talk a lot about adding to the collection. Let's do it!

For adding a model, or list of models to the set using method "add".

newUserCollection.add(user1); for add a model

newUserCollection.add([user1, user2]); for add a few model

If you need add model into the collection at the specified index, you can use {at: index} in options 

newUserCollection.add(user1, {at: 0});

Backbone checks if a model exists in a collection by comparing them by id, so If you're adding models to the collection that are already in the collection, they'll be ignored. But, if you need to merge the attributes of the new model and the existing, you can use {merge: true} in options. 
The "change" event will be fired for all changed attributes.

We can also use methods "push" and "unshift" to add models at the end or beginning of collection.

The “add” method starts the re-sorting of the collection using a comparator and returns the model that was added.  The "push" and "unshift" returns new collection length and don’t re-sort the collection.

"remove", "pop", "shift" 

To remove the model or list of models from the collection we need to call the "remove" method on the collection:

newUserCollection.remove(user1);

We can also use methods "pop" and "shift" to remove models at the end or beginning of collection.


"reset"

Also, if we want to empty the collection, we can call the "reset" method.

newUserCollection.reset();

We also can populate it with new models by passing a model or an array of models in the reset function.

newUserCollection.reset(user2);

newUserCollection.reset([user1, user2]);


"set"

For smart update of the collection can be used the "set" function.
This method will check for all the existing in the collection models and the models being passed.

If any new model is found in the models being passed, it will be added. If some are not present in the new models list, they will be removed.
If there are same models, they will be updated.

newUserCollection.add([user1, user2]);
newUserCollection.set([user1, user3]);

*will be updated user1, removed user2, add user3

All subscribers who listening "add", "delete" and "change" events on this collection, will be notified as events happen.

You can customize the behavior and disable it with options: {add: false}, {remove: false}, or {merge: false}.


"toJSON"

When we need to get attributes hash of each model in the collection we should use the method "toJSON", which will return an array containing required data.

newUserCollection.toJSON();


"get", "at", "slice"

If we need to get a specific model from the collection, we can do this, specified model by id, by applying the method "get".

newUserCollection.get(1);

We also can do this, specified model by index, by applying the method "at".

newUserCollection.at(1);

If we need to get the model specified model by index from the back of the collection, we should passed a negative index;

In the case when we need to get part of the collection, we can use "slice" specifying the start and end index for the selection, similar to the slice for arrays.

newUserCollection.slice(0, 1);



"find", "filter", "where", "findWhere", "reject"


Backbone provides powerful collection filtering tools. 

The "filter" method allows you to get an array of all models which satisfy the filtering function criteria.

newUserCollection.filter(user => user.get('age') > 18); 

* will return all users over 18 years old.

The "find" method works similarly, but returns only the first one that matches the filter criteria and stop iterating the collection.

The "where" and "findWhere" method works similarly, but filters by key-value pairs listed in the properties.

newUserCollection.where({ name: 'Vasya', age: 33 })

*will return all users with name Vasya 33 years old.

newUserCollection.findWhere({ name: 'Vasya', age: 33 })

*will return only the first one.

If no items pass the filter criteria, these methods will return "undefined".

When it is necessary to exclude some elements from the list, use the method "reject", to get an array without models, which satisfy the filtering function criteria.

newUserCollection.reject(user => user.get('age') > 18);

*will return all users under 18 years old.




"every", "some", "contains" 

When we just need to check the collection elements for compliance with a specific criterion, appropriate to use "every" or "some".

"every" will return "true" if all models from collection pass the acceptance criteria, "some" will return "true" if any of the models pass it. Otherwise they return "false".

newUserCollection.every(user => user.get('age') > 18);

*will return "false".

newUserCollection.some(user => user.get('age') > 18);

*will return "true".


There is also another useful feature that you should not forget - "contains". It returns “true” if collection contains an element equivalent to value. For example, we can check if a model exists in the collection.

newUserCollection.contains(user1);

*will return "true" in our case.



"invoke", "map", "each", "pluck"

Very often, we need to run some method of each model in the collection. In this case, the "invoke" method comes to the rescue.

When "invoke" is called, it is necessary to pass the executable method name and the necessary arguments to it. "Invoke" will iterate over all the elements of the collection and execute the passed method on each model. 
Returns an array of methods execution results.

newUserCollection.invoke('set', { company: 'SoftServe' });
If we need to get an array that represents each model of the collection, we can use "map" method.

For that to create a "representative" we must pass a “parsing” function which returns a representative based on model from collection:

newUserCollection.map(model => {
	if (model.get('company') === SoftServe) {
		return { bonus: 1000 };
	}
	
	return { bonus: 10 };
});

This method produces a new array of modified values.
If we need to modify the original collection (for example, for a call chain), we should use "each" method.

In the case when we need to get the value of an attribute of all elements of the collection, it is advisable to use the "pluck" method. 

newUserCollection.pluck('name');


"sortBy", "comparator", “sort”

Working with the Backbone.Collection we can easily sort it by any value using the "sortBy" method.

newUserCollection.sortBy('age');

In order to always keep the collection sorted by the desired value, you need to use the "comparator" method. 

The "comparator" is nothing more than a description of how the collection should behave after any changes, in order to always support the necessary sorting of models.
It can be described during the creation of the collection.


UserCollection = Backbone.Collection.extend({
	comparator(model) {
	  	return model.get('age');
	}	
});

The comparator can be defined with a single argument, or two arguments. In the case with one argument, the function returns a numeric or string value by which the model should be ordered relative to others. 
In the case with two arguments returns:
-1 if the first model should come before the second
0 if they are of the same rank
1 if the first model should come after.
The comparator can also be defined as a string indicating the attribute to sort by as alternative to the method “sortBy”.

"Sort" force a collection to re-sort itself.

"clone"

To get a full copy of the collection, we use "clone".

cloneUserCollection = newUserCollection.clone();


"size"

Everything is simple here. The method returns the number of elements in the collection.

------------------------

As you can see, Backbone provides us with all the necessary tools for working with collections. 
This makes it one of the best libraries for comfortable and flexible development.
