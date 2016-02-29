/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have defined URLs', function() {
            //Check that the feed URL is defined and is not empty
            for (var i = 0; i < allFeeds.length; i++)
            {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         //Check that the Feed name is defined and is not empty
         it('have defined names', function() {
            for (var i = 0; i < allFeeds.length; i++)
            {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
         });         
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            // Check for the body element to have a menu-hidden class
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('on being clicked, toggles between visible/hidden', function() {
            var menuLink = $('.menu-icon-link');
            // Click to change status - hidden to visible
            menuLink.trigger( "click" );
            // Since menu is visible, body should not have menu-hidden class
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            // Click again to change from visible to hidden
            menuLink.trigger( "click" );
            // Since menu is visible, body should now again have menu-hidden class            
            expect($('body').hasClass('menu-hidden')).toBeTruthy();            
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */  
         // we load a feed
         beforeEach(function(done) {
            loadFeed(0, done)
          });
         // and check that the entry length is not 0
         it('has at least one entry', function(done){   
            expect($('.feed .entry').length).not.toBe(0);
            done();
         });
     });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() { 
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         // Define variables to save data for firstFeed and secondFeed
         var firstFeed, secondFeed;

         beforeEach(function(done) {
            //loadFeed(0, done);
            loadFeed(0, function (){
                // save the feed content of the current feed
                firstFeed = $('.feed').html();
                //console.log($('.feed .entry h2').html());
                done(); 
            });     
          });

         it('changes content', function(done){   
            loadFeed(2, function (){
                // we loaded a new feed and we now save its content
                secondFeed = $('.feed').html();
                //console.log($('.feed .entry h2').html());
                done(); 
            });
            // we compare the original feed against the new loaded feed content         
            expect(secondFeed).not.toEqual(firstFeed);
         });

         // Reset the feed to restore the state
		afterEach(function() {
	    	loadFeed(0);
	  	});
    });         



}());
