const jqueryNodes = {
  'init.callee.property.name': {
    init: {
      callee: {
        property: {
          name: '$'
        }
      }
    }
  },
  'init.name': {
    init: {
      name: '$'
    }
  },
  'init.property.name': {
    init: {
      property: {
        name: 'jQuery'
      }
    }
  },
  'object.callee.property.name': {
    object: {
      callee: {
        property: {
          name: '$'
        }
      }
    }
  },
  'object.callee.name': {
    object: {
      callee: {
        name: '$'
      }
    }
  },
  'object.name': {
    object: {
      name: '$'
    }
  }
};

const emberJqueryNodes = {
  'init.callee.property.name': {
    init: {
      callee: {
        object: {
          name: 'Ember'
        },
        property: {
          name: '$'
        }
      }
    }
  },
  'init.property.name': {
    init: {
      object: {
        name: 'Ember'
      },
      property: {
        name: 'jQuery'
      }
    }
  }
};

const notJqueryNodes = {
  'init.callee.property.name': {
    init: {
      callee: {
        property: {
          name: 'not$'
        }
      }
    }
  },
  'init.name': {
    init: {
      name: 'not$'
    }
  },
  'init.property.name': {
    init: {
      property: {
        name: 'notJquery'
      }
    }
  },
  'object.callee.property.name': {
    object: {
      callee: {
        property: {
          name: 'not$'
        }
      }
    }
  },
  'object.callee.name': {
    object: {
      callee: {
        name: '$nope'
      }
    }
  },
  'object.name': {
    object: {
      name: 'notJquery'
    }
  }
};

module.exports = {
  jqueryNodes,
  emberJqueryNodes,
  notJqueryNodes
};
