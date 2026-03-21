/**
 * RaBbLE Dependency Container - The Quantum Injection System
 * Centralized dependency management for loose coupling and testability
 * 
 * Philosophy: Dependencies flow like quantum streams - injected, not instantiated
 * 
 * Usage:
 *   const q_container = new RaBbLE_DependencyContainer();
 *   q_container.q_register('engine', engineInstance);
 *   const engine = q_container.q_resolve('engine');
 */

class RaBbLE_DependencyContainer {
  /**
   * Initialize the dependency container
   */
  constructor() {
    // The container awakens... ready to hold the quantum dependencies.
    this.q_dependencies = new Map();
    this.q_factories = new Map();
    this.q_singletons = new Map();
    this.q_resolving = new Set(); // Circular dependency detection
  }

  /**
   * q_register - Register a dependency instance
   * @param {string} f_name - Dependency name
   * @param {*} f_instance - Dependency instance
   * @param {boolean} [f_singleton] - Whether this is a singleton (default: true)
   * @returns {RaBbLE_DependencyContainer} This container for chaining
   */
  q_register(f_name, f_instance, f_singleton = true) {
    // The dependency enters the quantum registry... bound to its name.
    if (f_singleton) {
      this.q_singletons.set(f_name, f_instance);
    } else {
      this.q_dependencies.set(f_name, f_instance);
    }
    return this;
  }

  /**
   * q_registerFactory - Register a factory function for lazy instantiation
   * @param {string} f_name - Dependency name
   * @param {Function} f_factory - Factory function that returns the dependency
   * @param {boolean} [f_singleton] - Whether to cache the instance (default: true)
   * @returns {RaBbLE_DependencyContainer} This container for chaining
   */
  q_registerFactory(f_name, f_factory, f_singleton = true) {
    // The factory is registered... ready to transmute when needed.
    this.q_factories.set(f_name, {
      factory: f_factory,
      singleton: f_singleton,
      instance: null
    });
    return this;
  }

  /**
   * q_registerClass - Register a class constructor for instantiation
   * @param {string} f_name - Dependency name
   * @param {Function} f_class - Class constructor
   * @param {Array<string>} [f_deps] - Names of dependencies to inject
   * @param {boolean} [f_singleton] - Whether to cache the instance (default: true)
   * @returns {RaBbLE_DependencyContainer} This container for chaining
   */
  q_registerClass(f_name, f_class, f_deps = [], f_singleton = true) {
    // The class is registered... ready to be instantiated with its quantum entanglements.
    this.q_registerFactory(f_name, () => {
      // Resolve dependencies
      const q_resolved_deps = f_deps.map(dep => this.q_resolve(dep));
      
      // Instantiate class with dependencies
      return new f_class(...q_resolved_deps);
    }, f_singleton);
    
    return this;
  }

  /**
   * q_registerValue - Register a simple value (number, string, object)
   * @param {string} f_name - Dependency name
   * @param {*} f_value - Value to register
   * @returns {RaBbLE_DependencyContainer} This container for chaining
   */
  q_registerValue(f_name, f_value) {
    // The value is registered... a constant in the quantum field.
    this.q_singletons.set(f_name, f_value);
    return this;
  }

  /**
   * q_resolve - Resolve a dependency by name
   * @param {string} f_name - Dependency name
   * @returns {*} Resolved dependency
   * @throws {Error} If dependency not found or circular dependency detected
   */
  q_resolve(f_name) {
    // Circular dependency detection... the quantum loop guard.
    if (this.q_resolving.has(f_name)) {
      throw new Error(`Circular dependency detected: ${f_name}`);
    }

    // Check singletons first
    if (this.q_singletons.has(f_name)) {
      return this.q_singletons.get(f_name);
    }

    // Check regular dependencies
    if (this.q_dependencies.has(f_name)) {
      return this.q_dependencies.get(f_name);
    }

    // Check factories
    if (this.q_factories.has(f_name)) {
      const q_factory_config = this.q_factories.get(f_name);
      
      // If singleton and already instantiated, return cached instance
      if (q_factory_config.singleton && q_factory_config.instance !== null) {
        return q_factory_config.instance;
      }

      // Mark as resolving for circular dependency detection
      this.q_resolving.add(f_name);

      try {
        // Instantiate via factory
        const q_instance = q_factory_config.factory();
        
        // Cache if singleton
        if (q_factory_config.singleton) {
          q_factory_config.instance = q_instance;
        }

        return q_instance;
      } finally {
        // Remove from resolving set
        this.q_resolving.delete(f_name);
      }
    }

    // Dependency not found... the void responds with chaos.
    throw new Error(`Dependency not found: ${f_name}`);
  }

  /**
   * q_has - Check if a dependency is registered
   * @param {string} f_name - Dependency name
   * @returns {boolean} True if registered
   */
  q_has(f_name) {
    return this.q_singletons.has(f_name) || 
           this.q_dependencies.has(f_name) || 
           this.q_factories.has(f_name);
  }

  /**
   * q_remove - Remove a dependency
   * @param {string} f_name - Dependency name
   * @returns {boolean} True if removed
   */
  q_remove(f_name) {
    // The dependency dissolves... returning to the quantum void.
    let q_removed = false;
    
    if (this.q_singletons.has(f_name)) {
      this.q_singletons.delete(f_name);
      q_removed = true;
    }
    
    if (this.q_dependencies.has(f_name)) {
      this.q_dependencies.delete(f_name);
      q_removed = true;
    }
    
    if (this.q_factories.has(f_name)) {
      this.q_factories.delete(f_name);
      q_removed = true;
    }
    
    return q_removed;
  }

  /**
   * q_extractNames - Get all registered dependency names
   * @returns {Array<string>} Dependency names
   */
  q_extractNames() {
    const q_names = new Set();
    
    this.q_singletons.forEach((_, name) => q_names.add(name));
    this.q_dependencies.forEach((_, name) => q_names.add(name));
    this.q_factories.forEach((_, name) => q_names.add(name));
    
    return Array.from(q_names);
  }

  /**
   * q_extractStats - Get container statistics
   * @returns {Object} Container statistics
   */
  q_extractStats() {
    return {
      singletons: this.q_singletons.size,
      dependencies: this.q_dependencies.size,
      factories: this.q_factories.size,
      total: this.q_singletons.size + this.q_dependencies.size + this.q_factories.size
    };
  }

  /**
   * q_reset - Clear all dependencies
   * @returns {RaBbLE_DependencyContainer} This container for chaining
   */
  q_reset() {
    // The container resets... all dependencies return to the void.
    this.q_singletons.clear();
    this.q_dependencies.clear();
    this.q_factories.clear();
    this.q_resolving.clear();
    return this;
  }

  /**
   * q_createChild - Create a child container that inherits from this one
   * @returns {RaBbLE_DependencyContainer} Child container
   */
  q_createChild() {
    // A child container emerges... inheriting the quantum field of its parent.
    const q_child = new RaBbLE_DependencyContainer();
    
    // Copy parent's dependencies
    this.q_singletons.forEach((value, key) => {
      q_child.q_singletons.set(key, value);
    });
    
    this.q_dependencies.forEach((value, key) => {
      q_child.q_dependencies.set(key, value);
    });
    
    this.q_factories.forEach((value, key) => {
      q_child.q_factories.set(key, { ...value });
    });
    
    return q_child;
  }

  /**
   * q_configure - Configure multiple dependencies at once
   * @param {Object} f_config - Configuration object
   * @returns {RaBbLE_DependencyContainer} This container for chaining
   * 
   * Example:
   *   container.q_configure({
   *     engine: { instance: engineInstance },
   *     runtime: { factory: () => new Runtime() },
   *     config: { value: RABBLE_CONFIG }
   *   });
   */
  q_configure(f_config) {
    // The configuration flows... dependencies align in the quantum field.
    Object.entries(f_config).forEach(([name, config]) => {
      if (config.instance !== undefined) {
        this.q_register(name, config.instance, config.singleton !== false);
      } else if (config.factory !== undefined) {
        this.q_registerFactory(name, config.factory, config.singleton !== false);
      } else if (config.value !== undefined) {
        this.q_registerValue(name, config.value);
      } else if (config.class !== undefined) {
        this.q_registerClass(name, config.class, config.deps || [], config.singleton !== false);
      }
    });
    
    return this;
  }
}

// Export for ES6 modules
export { RaBbLE_DependencyContainer };