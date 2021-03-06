import { test } from 'qunit';
import moduleForAcceptance from 'ahasweb/tests/helpers/module-for-acceptance';
import { authenticateSession} from '../helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search contact');

test('visiting /search-contact', function(assert) {
  authenticateSession(this.application);
  visit('/search-contact');

  andThen(function() {
    assert.equal(currentURL(), '/search-contact');
  });
});

test('checking search info rendered before search', function(assert) {
  authenticateSession(this.application);
  visit('/search-contact');

  andThen(function() {
    assert.equal(find('#veterinariansHeading').text(), 'Veterinarians');
    assert.equal(find('.veterinariansContact').first().text(), 'Tony Stark');
   
  });
});

test('checking we can search', function(assert) {
  authenticateSession(this.application);
  visit('/search-contact');

  fillIn('#search-bar', 'Justin');
  click('#search-button');

  andThen(function() {
    assert.equal(find('.volunteersContact').length, 1);
    assert.equal(find('.volunteersContact').first().text(), 'Justin Barclay');

  });
});
