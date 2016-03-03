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


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

       /* In this function, the it and expect functions are combined together.
         * This function does the checks for feed URL - it should be defined, it 
         * should not be empty and the URL starts with http or https
         */
         function testEachFeedInallFeeds(afeed) {
            it('have defined URLs and start with http', function() {
                var checkURL = allFeeds[afeed].url;
                expect(checkURL).toBeDefined(); // Is the URL defined?
                expect(checkURL).not.toBe(0);   // Is the URL empty?
				expect(checkURL).toMatch(/^http(s?)\:\/\//);  // Does the URL start with http or https? 
            });
        }

        // Loop to verify each feed in allFeeds and call the function defined above
		for(var feed = 0, len = allFeeds.length; feed < len; feed++) {
		    testEachFeedInallFeeds(feed);
		}


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        /* In this function, the it and expect functions are combined together.
         * This function does the checks for feed name - it should be defined and it 
         * should not be empty
         */
        function testEachFeedInallFeedsforName(afeed) {
            it('have defined name and the name is not empty', function() {
                var checkName = allFeeds[afeed].name;
                expect(checkName).toBeDefined(); // check that the name is defined
                expect(checkName).not.toBe(0);   // check the Name is not empty
            });
        }  
               
         // Loop to verify each feed in allFeeds and call the name test function defined above
		for(var feed = 0, len = allFeeds.length; feed < len; feed++) {
		   testEachFeedInallFeedsforName(feed);
		}
    });


    /* A new test suite named "The menu" to test the Menu behavior */
    describe('The menu', function() {
        /* This test checks that the menu element is
         * hidden by default. */
        it('is hidden', function() {
            // Check for the body element to have a menu-hidden class
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
         /* This test is to ensure that the menu visbility changes
          * when the menu icon is clicked. This test has
          * two checks: the menu should display when first
          * clicked and it should hide when clicked again.
          */
        it('on being clicked, toggles between visible/hidden', function() {
            var menuLink = $('.menu-icon-link');
            // Click to change status - hidden to visible
            menuLink.trigger( "click" );
            // Since menu is visible, body should not have menu-hidden class
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            // Click again to change - now visible to hidden
            menuLink.trigger( "click" );
            // Since menu is visible, body should now again have menu-hidden class            
            expect($('body').hasClass('menu-hidden')).toBeTruthy();            
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container. */  
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
    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', function() { 
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         // Define variables to save data for the initial Feed and then the changed Feed
         var firstFeed, secondFeed;

         // Changing our loadFeed calls based on initial review feedback
         beforeEach(function(done) {
            //loadFeed(0, done);
            loadFeed(0, function (){
                // save the feed content of the current feed
                firstFeed = $('.feed').html();
                loadFeed(2, function (){
	                // we loaded a new feed and we now save it in a variable for comparison
	                secondFeed = $('.feed').html();
                	done(); 
                });
            });     
          });

         it('changes content', function(done){   
            // we compare the original feed against the new loaded feed content         
            expect(secondFeed).not.toEqual(firstFeed);
            done();         
         });

         // Reset the feed to restore to original state
		afterEach(function() {
	    	loadFeed(0);
	  	});
    });         



}());
