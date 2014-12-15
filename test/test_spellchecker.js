var spellchecker = require('../spellchecker');
var test_data = require('test_spellchecker_data');

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
        var expected = {
          'the': 10,
          'studio': 1,
          'was': 1,
          'filled': 1,
          'with': 1,
          'rich': 1,
          'odour': 1,
          'of': 4,
          'roses': 1,
          'and': 1,
          'when': 1,
          'light': 1,
          'summer': 1,
          'wind': 1,
          'stirred', 1,
          'amidst': 1,
          'trees': 1,
          'garden': 1,
          'there': 1,
          'came': 1,
          'through': 1,
          'open': 1,
          'door': 1,
          'heavy': 1,
          'scent': 1,
          'lilac': 1,
          'or': 1,
          'more': 1,
          'delicate': 1,
          'perfume': 1,
          'pink': 1,
          'flowering': 1,
          'thorn': 1
        }
        assert.equal(expected, spellchecker.train(passage));
    });
    describe('#known()', function() {
        assert.equal(['or'], known('to be or not to be', passage));
        assert.equal(['flowering', 'lilac', 'roses', 'tree'],
            spellchecker.known('flowering lilac\'s roses, azalia, tree',
                passage));
    });
    describe('#_splits()', function() {
        expected = [
            [['', 'the'], ['t', 'he'], ['th', 'e'], ['the', '']],
            [['', 'studio'], ['s', 'tudio'], ['st', 'udio'], ['stu', 'dio'],
              ['stud', 'io'], ['studi', 'o'], ['studio', '']],
            [['', 'was'], ['w', 'as'], ['wa', 's'], ['was', '']],
            [['', 'filled'], ['f', 'illed'], ['fi', 'lled'], ['fil', 'led'],
              ['fill', 'ed'], ['fille', 'd'], ['filled', '']],
            [['', 'with'], ['w', 'ith'], ['wi', 'th'], ['wit', 'h'],
              ['with', '']]
        ];
        assert.equal(expected, spellchecker._splits(passage5));
    });
    describe('#_deletes()', function() {
        var expected = ['he', 'te', 'th', 'tudio', 'sudio', 'stdio', 'stuio',
        'studo', 'studi', 'as', 'ws', 'wa', 'illed', 'flled', 'filed', 'filed',
        'filld', 'fille', 'ith', 'wth', 'wih', 'wit']
        assert.equal(expected, spellchecker._deletes(passage5));
    });
    describe('#_transposes()', function() {
        assert(test_data.expected_5_transposes, spellchecker._transposes(passage5));
    });
    describe('#_replaces()', function() {
        assert.equal(test_data.expected_5_replaces, spellchecker._replaces(passage5));
    });
    describe('#_inserts()', function() {
        assert.equal(test_data.expected_5_inserts, spellchecker._inserts(passage5));
    });

    describe('#known_edits()', function() {
        assert.equal(['its late'], spellchecker.known_edits(passage5);
    });
});
