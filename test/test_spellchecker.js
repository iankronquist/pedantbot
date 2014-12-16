'use strict'

var spellchecker = require('../spellchecker');
var test_data = require('./test_spellchecker_data');

var assert = require('assert');
var passage = [ 'the', 'studio', 'was', 'filled', 'with', 'the',
  'rich', 'odour', 'of', 'roses,', 'and', 'when', 'the', 'light',
  'summer', 'wind', 'stirred', 'amidst', 'the', 'trees', 'of', 'the',
  'garden,', 'there', 'came', 'through', 'the', 'open', 'door', 'the',
  'heavy', 'scent', 'of', 'the', 'lilac,', 'or', 'the', 'more',
  'delicate', 'perfume', 'of', 'the', 'pink-flowering', 'thorn.'];
var passage5 = passage.slice(5);
describe('spellchecker', function() {
    describe('#train()', function() {
        assert.equal(test_data.expected_concordance,
            spellchecker.train(passage));
    });
    describe('#known()', function() {
        assert.equal(['or'], known('to be or not to be', passage));
        assert.equal(['flowering', 'lilac', 'roses', 'tree'],
            spellchecker.known('flowering lilac\'s roses, azalia, tree',
                passage));
    });
    describe('#_splits()', function() {
        assert.equal(test_data.expected_splits, spellchecker._splits(passage5));
    });
    describe('#_deletes()', function() {
        assert.equal(test_data.expected_deletes, spellchecker._deletes(passage5));
    });
    describe('#_transposes()', function() {
        assert(test_data.expected_transposes, spellchecker._transposes(passage5));
    });
    describe('#_replaces()', function() {
        assert.equal(test_data.expected_replacements, spellchecker._replaces(passage5));
    });
    describe('#_inserts()', function() {
        assert.equal(test_data.expected_inserts, spellchecker._inserts(passage5));
    });

    describe('#known_edits()', function() {
        assert.equal(['the'], spellchecker.known_edits('teh'));
        assert.equal(['hat', 'that'], spellchecker.known_edits('tha'));
        assert.equal(['achieve'], spellchecker.known_edits('acheive'));
        assert.equal(['broccoli'], spellchecker.known_edits('brocolli'));
    });
});
