const assert = require('assert');
const camelCaseToDjango = require('../');

describe('camelCaseToDjango', () => {
  describe('non objects and null', () => {
    it('should return same value', () => {
      assert.equal(camelCaseToDjango(-1), -1);
    });

    it('should return same value', () => {
      assert.equal(camelCaseToDjango(null), null);
    });

    it('should return same value', () => {
      assert.equal(camelCaseToDjango('test'), 'test');
    });
  });

  describe('simple objects', () => {
    it('should work with empty array', () => {
      assert.deepEqual(camelCaseToDjango([]), []);
    });

    it('should work with filled array', () => {
      const obj = [1, '2', null, [], {}];
      assert.deepEqual(camelCaseToDjango(obj), obj);
    });

    it('should work with empty object', () => {
      assert.deepEqual(camelCaseToDjango({}), {});
    });

    it('should work with simple object', () => {
      const obj = {
        simpleint: 1,
        simplestring: 'string',
        nullvalue: null,
        emptyarray: [],
        emptyobject: {},
      };
      assert.deepEqual(camelCaseToDjango(obj), obj);
    });
  });

  describe('nesting level one', () => {
    it('should change camelCase to _ notation with simple values', () => {
      const obj = {
        simpleInt: 1,
        simpleString: 'string',
        nullValue: null,
        emptyArray: [],
        emptyObject: {},
        longNameWithFewChanges: 'done',
      };

      const result = {
        simple_int: 1,
        simple_string: 'string',
        null_value: null,
        empty_array: [],
        empty_object: {},
        long_name_with_few_changes: 'done',
      };

      assert.deepEqual(camelCaseToDjango(obj), result);
    });

    it('should change camelCase to _ notation with simple values and custom sign', () => {
      const obj = {
        simpleInt: 1,
        simpleString: 'string',
        nullValue: null,
        emptyArray: [],
        emptyObject: {},
        longNameWithFewChanges: 'done',
      };
      const sign = '+';
      const result = {
        'simple+int': 1,
        'simple+string': 'string',
        'null+value': null,
        'empty+array': [],
        'empty+object': {},
        'long+name+with+few+changes': 'done',
      };

      assert.deepEqual(camelCaseToDjango(obj, sign), result);
    });

    it('should NOT change _ notation', () => {
      const obj = {
        simple_int: 1,
        simple_string: 'string',
        null_value: null,
        empty_array: [],
        empty_object: {},
      };

      assert.deepEqual(camelCaseToDjango(obj), obj);
    });

    it('should change camelCase to _ notation with mixed props', () => {
      const obj = {
        simpleInt: 1,
        simpleString: 'string',
        null_Value: null,
        empty_Array: [],
        empty_object: {},
      };
      const result = {
        simple_int: 1,
        simple_string: 'string',
        null_value: null,
        empty_array: [],
        empty_object: {},
      };

      assert.deepEqual(camelCaseToDjango(obj), result);
    });

    it('should change mixed props to custom notation', () => {
      const obj = {
        simpleInt: 1,
        simpleString: 'string',
        null_Value: null,
        empty_Array: [],
        empty_object: {},
      };
      const sign = '+';
      const result = {
        'simple+int': 1,
        'simple+string': 'string',
        'null+value': null,
        'empty+array': [],
        'empty+object': {},
      };

      assert.deepEqual(camelCaseToDjango(obj, sign), result);
    });
  });

  describe('nesting level two', () => {
    it('should change camelCase to _ notation with mixed props', () => {
      const obj = {
        filledArray: [1, '2', null, [], {}],
        filledArray2: [1, '2', null, [], {
          simpleInt: 1,
          simpleString: 'string',
          null_Value: null,
          empty_Array: [],
          empty_object: {},
        }],
        filledObject: {
          simpleInt: 1,
          simpleString: 'string',
          null_Value: null,
          empty_Array: [],
          empty_object: {},
        },

      };
      const result = {
        filled_array: [1, '2', null, [], {}],
        filled_array2: [1, '2', null, [], {
          simple_int: 1,
          simple_string: 'string',
          null_value: null,
          empty_array: [],
          empty_object: {},
        }],
        filled_object: {
          simple_int: 1,
          simple_string: 'string',
          null_value: null,
          empty_array: [],
          empty_object: {},
        },
      };

      assert.deepEqual(camelCaseToDjango(obj), result);
    });
    it('should work with not stardard cases', () => {
      const obj = {
        aBbbbCDEeFfGH: 'works',
        aBBtBBBtBBBbBBBtbbbCDEeFfGH: 'works',
      };
      const result = {
        a_bbbb_c_d_ee_ff_g_h: 'works',
        a_b_bt_b_b_bt_b_b_bb_b_b_btbbb_c_d_ee_ff_g_h: 'works',
      };

      assert.deepEqual(camelCaseToDjango(obj), result);
    });
  });
});
