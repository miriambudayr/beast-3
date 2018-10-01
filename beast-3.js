(function () {
  var libraryStorage = {};
  function librarySystem(libraryName, dependencies, callback) {
    //Store library.
    if (arguments.length > 1) {
      //If dependencies exist, load them and save library with dependencies.
      if (dependencies.length > 0) {
        var dependencyLibraries;
        dependencies = dependencies.map(function(dependencyName) {
          return libraryStorage[dependencyName];
        })
        libraryStorage[libraryName] = callback.apply(null, dependencies);
      //If no dependencies, just run callback and save library.
      } else {
        libraryStorage[libraryName] = callback();
      }
      //Retrieve library.
    } else {
      return libraryStorage[libraryName];
    }
  }

  window.librarySystem = librarySystem;
}());


librarySystem('name', [], function() {
  return 'Gordon';
});

librarySystem('company', [], function() {
  return 'Watch and Code';
});

librarySystem('workBlurb', ['name', 'company'], function(name, company) {
  return name + ' works at ' + company;
});

librarySystem('workBlurb'); //'Gordon works at Watch and Code'
