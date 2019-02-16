'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно с простыми объектами', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});
		assert.deepEqual(plainify({foo: 553}), {'foo': 553});
		assert.deepEqual(plainify({name1: '1', name2: 42}), {'name1': '1', 'name2': 42});
	});	
	
	QUnit.test('plainify работает правильно с небольшим уровнем вложенности', function (assert) {
		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			look: 'if you',
			had: {
				shot: 1,
				oportunity: 1
			},
			to : 'seize',
			everything: {
				you: 'ever',
				wanted: 'in',
				moment: 1
			}
		};

		const plain2 = {
			'look': 'if you',
			'had.shot': 1,
			'had.oportunity': 1,
			'to': 'seize',
			'everything.you': 'ever',
			'everything.wanted': 'in',
			'everything.moment': 1
		};
		
		assert.deepEqual(plainify(nested2), plain2);

			
	});

	QUnit.test('plainify работает правильно с большим уровнем вложенности', function (assert) {
		const nested1 = {
			lorem: {
				ipsum: {
					dolor: {
						sit: {
							amet: {
								consectetur: {
									adipiscing: 'elit',
									duis: 'sed'
								}
							}
						}
					}
				}
			}
		};

		const plain1 = {
			'lorem.ipsum.dolor.sit.amet.consectetur.adipiscing': 'elit',
			'lorem.ipsum.dolor.sit.amet.consectetur.duis': 'sed'
		};
		
		assert.deepEqual(plainify(nested1), plain1);


		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);
	});
		
	QUnit.test('plainify работает правильно с чередованием вложенных объектов и простых полей', function (assert) {
		const nested3 = {
			baz: 44,
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						},
						baz: 44
					}
				},
				baz: 44
			}
		};

		const plain3 = {
			'baz': 44,
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42,
			'deep.nested.object.baz': 44,
			'deep.baz': 44
		};

		assert.deepEqual(plainify(nested3), plain3);
	});

	QUnit.test('plainify работает правильно с типами, не являющимися объектами, и null', function (assert) {
		assert.deepEqual(plainify(42), null);
		assert.deepEqual(plainify(null), null);
		assert.deepEqual(plainify(undefined), null);
	});	
});
