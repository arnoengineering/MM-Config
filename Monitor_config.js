/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out or empty, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: 'MMM-pages',
			config: {
				modules:
				    [
					[ "compliments", "email", "MMM-Googletasks", "MMM-CalendarMonthly"],
					[ "MMM-SpaceLaunchNow", "MMM-Mycomute", "MMM-Mars", "MMM-ISS-Live"]
				     ],
				fixed: ["clock", "MMM-Astronauts", "calendar", "MMM-EARTH-Live"],
			}
		},
		{
			module: "MMM-Button",
			position: "bottom_bar",
			config: {
				buttonPIN: 11,
				notificationMessage: "PAGE_IN"
			}
		}, 
		{
			module: "MMM-Button",
			position: "bottom_bar",
			config: {
				buttonPIN: 13,
				notificationMessage: "PAGE_DE"
			}
		},
		{
		  module: 'MMM-NotificationTrigger',
		  //This module works in Background, so you don't need to describe `position`.
		  config: {
		    useWebhook: false, // If you want to activate webhook as Notification emitter, set true. (eg. IFTTT)
		    triggers:[ // Array of triggers.
		        {
			trigger: "PAGE_IN", //REQUIRED
			fires: [ // Array of fires. You can enable multi-firing with one trigger.
			  {
			    fire:"PAGE_CHANGED", //REQUIRED
			    payload: (payload) => { //OPTIONAL. transform received payload to what your target module wants.
			      return 0
			    },
			  },
			],
		      },
		      {
			      trigger: "PAGE_DE",
			      fires: [
				{
					fire: "PAGE_CHANGED",
					payload: (payload) => { //OPTIONAL. transform received payload to what your target module wants.
					return 1
					},
				},
				],
			},
		    ],
		  },
		},
		{
			module: "alert",
			position: "top_bar"
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "My Calendar",
			position: "top_left",
			config: {
				colored: true,
				coloredSymbolOnly: true,
				calendars: [
					{
						symbol: "Home",  //generic
						url: "https://calendar.google.com/calendar/ical/parnoclaassens%40gmail.com/private-8e43aa03f877f4e34ebfc2d9d7890941/basic.ics"
					},
					{
						symbol: "brain",  //assignments
						url: "https://calendar.google.com/calendar/ical/1kggfd3ad80u85bofk1k4tmioc%40group.calendar.google.com/private-596c99b4ce536950999832482cbddeb2/basic.ics"
					},
				]
			}
		},
		{
			module: "calendar",
			header: "Events",
			position: "bottom_left",
			config: {
				calendars: [
					{
						symbol: "coffee", //canada holidays
						url: "https://www.officeholidays.com/ics-clean/canada"
					},
				]
			}
		},
		{
			module: "calendar",
			header: "Exams",
			position: "middle_center",
			config: {
				calendars: [
					{
						symbol: "atom",
						url: "https://calendar.google.com/calendar/ical/1uf9561hen09phcdehornbml9o%40group.calendar.google.com/private-852424af9bc73a5dcda4717ee3a4bf2e/basic.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third",
			config: {
				size: "medium",
				updateInterval: 86400000,
				compliments: {
					anytime: ["Speedmaster Auto",
						"Speedmaster Manul",
						"Casio F91W",
						"Casio Protreck",
						"Casio G-Shock",
						"Citizen PCAT",
						"Citezen Aquamaster",
						"citezen Skyawk",
						"Bolva 1",
						"Bolova 2",
						"Bolova 3",
						"Bolova 4",
						"Seiko SARB",
						"Seiko Quartz",
						"Seiko Nato",
						]
					
				}
			}
		},
		{
			module: 'email',
			position: 'bottom_center',
			header: 'Email',
			config: {
			    accounts: [
				{
				    user: 'pclaasse@ualberta.ca',
				    password: 'uHi2u4me3war44&pi',
				    host: 'imap.gmail.com',
				    port: 993,
				    tls: true,
				    authTimeout: 10000,
				    numberOfEmails: 5,

				},
				{
				    user: 'parnoclaassens@gmail.com',
				    password: 'gHi2u4me3war44&pi',
				    host: 'imap.gmail.com',
				    port: 993,
				    tls: true,
				    authTimeout: 10000,
				    numberOfEmails: 5,
				}
			    ],
			    fade: true,
			    maxCharacters: 30
		    }
                },
		{
			module: 'MMM-Astronauts',
			position: 'upper_third',
			config: {
				useHeader: false,                // true if you want a header      
				header: "",                      // Change in config file. useHeader must be true
				maxWidth: "300px",
				animationSpeed: 3000,            // fade speed
			}
		},
		{
			module: "MMM-SpaceLaunchNow",
			position: "lower_third",
			config: {
				records: 8,
				modus: "upcoming",
				showExtraInfo: false,
				showColumnHeader: false,
				}
		},
		{
			module: 'MMM-GoogleTasks',
			header: "Google Tasks",
			position: "bottom_right",
			config: {
				listID: "MDkzMDE5MDA5OTQ5NDgyNDg1MTQ6MDow"
				// See below for Configuration Option
				}
		},
		{
			module: 'MMM-EARTH-Live',
			position: 'top_center',
			config: {
			    height:"270px",
			    width:"480px",
			    useHeader: false,                // true if you want a header
			    header: "",                      // Change in config file. useHeader must be true
			    animationSpeed: 1000,
			    }            // fade speed
		},
		{
			module: 'calendar_monthly',
			position: 'top_right',
			config: {
					// The config property is optional
					// Without a config, a default month view is shown
					// Please see the 'Configuration Options' section for more information
			}
		},
		{
			disabled: false,
			module: 'MMM-ISS-Live',
			position: 'bottom_right',
			config: {
			    useHeader: false,                // true if you want a header
			    header: "",                      // Change in config file. useHeader must be true
			    animationSpeed: 1000,            // fade speed
			}
		},
		{
			module: 'MMM-MARS',
			position: 'bottom_left',
			config: {
				scroll: "no",                    // yes or no. Yes scrolls single line information under image
				rover: "curiosity",              // which rover? curiosity, opportunity or spirit
				solDate: "200",                      // sol date you want pictures from
				useHeader: false,                // true if you want a header      
				header: "",                      // useHeader must be true
				maxWidth: "300px",
				rotateInterval: 5 * 60 * 1000,   // new image 5 minutes
			}
		},
		{
			module: 'MMM-MyCommute',
			position: 'top_right',
			config: {
			    apiKey: 'AIzaSyCg9QhlvM161tjq92EvOWzJC2z0rLANEjI',
			    origin: '11504 77 Ave NW, Edmonton, AB T6G 0M1, Canada',
			    destinations: [
			      {
				destination: 'University of, Centennial Centre for Interdisciplinary Science, Edmonton, AB T6G 2E9, Canada',
				label: 'CCIS',
				mode: 'walking',
				color: '#82E5AA'
			      },
			      {
				    destination: 'ETLC, 116 St NW, Edmonton, AB T6G 2V4, Canada',
				label: 'ETLC',
				mode: 'transit',
				color: '#00ff00'  
			      }
			   ]
		      }
	      },

	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
