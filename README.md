Anglar + NodeJS sample app.

Gradually including all best practices and interesting tehcnologies. Like the 'Finer things club' in the Office. =)

##Git
Using feature branches:

* Master = deployed in Azure (back end continuous integration, front end as standard drag and drop for the time being).
* Develop = accepted code
* Feature branches = in work code


##Server side

Run `npm install` in /Server folder.
Run `gulp`

Tests via Mocha `mocha Test/` (Make sure mocha is installed on your local environment `npm install -g mocha` ).

##Client side
Run `bower install` in client folder (make sure you have bowe in your machine).
Run it with your favourite server (I use `http-server`).


##ToDo List

* Split business logic from controller in separate layer and implement using promises rather than sync.
* Include End to End test on temp vote file.
* Include Persistance layer to MongoLab ILO file system for vote file.
* Change naming convetion for app and server.
* Manual mocks, for the time being. Must find a package like Moq for node.
* Split Controller from business logic for better unit testability.
* Include gulp file for front end configurations.

