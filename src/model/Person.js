'use strict';

/**
 * @ngInject
 */
let Person = function(PersonResource) {
  
  let name = (p) => `${p.first_name} ${p.last_name}`;
  
  let person = Object.assign(PersonResource, {
    
    // Person.fn(person)
    fn: (p) => `${p.first_name} ${p.last_name}`,
    
    // Person.initials(person)
    initials: (p) => {
      return name(p).split(' ').map(f => {
          if (f.length > 0) {
            return f[0].toUpperCase();
          }
        }).join('');
    }
    
  });
  return person;
  
};

module.exports = Person;
