Vue.component('collapsible-item', {
    template: '#collapsible-item-template',
    props: {
        model: Object
    },
    data: function () {
        return {
            open: false
        }
    },
    methods: {
        toggle: function () {
            this.open = !this.open
        },
    }
});

const HEADHONE_LIST = [
{
    manufacturer: 'AIAIAI',
    models: [
        'AIAIAI TMA-1 Studio (PU Foam earpads)',
    ]
},
{
    manufacturer: 'AKG',
    models: [
        'AKG K121 Studio',
        'AKG K141 MKII',
        'AKG K171 MKII',
        'AKG K240 MKII',
        'AKG K240 Studio',
        'AKG K271 MKII',
        'AKG K52',
        'AKG K550 MKII',
        'AKG K553 Pro',
        'AKG K701',
        'AKG K702',
        'AKG K612 Pro',
        'AKG K712 Pro',
        'AKG K72',
        'AKG K77',
        'AKG K812',
        'AKG Q701'
    ]
},
{
    manufacturer: 'Astro',
    models: [
        'Astro A40 TR'
    ]
},
{
    manufacturer: 'Audeze',
    models: [
        'Audeze LCD-2',
        'Audeze LCD-X'
    ]
},
{
    manufacturer: 'Audio-Technica',
    models: [
        'Audio-Technica ATH-AD1000X',
        'Audio-Technica ATH-AD500X',
        'Audio-Technica ATH-AD700X',
        'Audio-Technica ATH-DSR7BT',
        'Audio-Technica ATH-M20X',
        'Audio-Technica ATH-M30x',
        'Audio-Technica ATH-M40X',
        'Audio-Technica ATH-M50X',
        'Audio-Technica ATH-M70X',
        'Audio-Technica ATH-MSR7',
        'Audio-Technica ATH-R70X'
    ]
},
{
    manufacturer: 'Avantone Pro',
    models: [
        'Avantone Pro MP-1 MixPhones'
    ]
},
{
    manufacturer: 'B&O Play',
    models: [
        'B&O Play Beoplay H4',
        'B&O Play Beoplay H6 (2nd generation)'
    ]
},
{
    manufacturer: 'Beats',
    models: [
        'Beats EP',
        'Beats Mixr',
        'Beats Pro',
        'Beats Solo2',
        'Beats Solo3 wireless',
        'Beats Studio 2.0',
        'Beats Studio3 Wireless (Pure ANC On, Bluetooth)',
        'Beats Studio3 Wireless (Pure ANC On, with cable)'
    ]
},
{
    manufacturer: 'Behringer',
    models: [
        'Behringer HPM1000',
        'Behringer HPS3000'
    ]
},
{
    manufacturer: 'Beyerdynamic',
    models: [
        'Beyerdynamic Custom One Pro Plus',
        'Beyerdynamic DT 150',
        'Beyerdynamic DT 240 Pro',
        'Beyerdynamic DT 250 80 Ohm',
        'Beyerdynamic DT 770 M 80 Ohm',
        'Beyerdynamic DT 770 PRO 32 Ohm',
        'Beyerdynamic DT 770 PRO 80 Ohm',
        'Beyerdynamic DT 770 PRO 250 Ohm',
        'Beyerdynamic DT 880 Edition 250 Ohm',
        'Beyerdynamic DT 880 PRO 250 Ohm',
        'Beyerdynamic DT 990 PRO',
        'Beyerdynamic DT 1770 PRO',
        'Beyerdynamic DT 1990 Pro (Analytical earpads)',
        'Beyerdynamic DT 1990 Pro (Balanced earpads)',
        'Beyerdynamic T 1 (1st generation)'
    ]
},
{
    manufacturer: 'Blue',
    models: [
        'Blue Lola',
        'Blue Mo-Fi (Off)',
        'Blue Mo-Fi (On+)'
    ]
},
{
    manufacturer: 'Bose',
    models: [
        'Bose QuietComfort 25 (Noise cancelling On)',
        'Bose QuietComfort 25 (Noise cancelling Off)',
        'Bose QuietComfort 35 (Noise cancelling On)',
        'Bose QuietComfort 35 (Noise cancelling Off)',
        'Bose QuietComfort 35 II (Noise cancelling On)',
        'Bose QuietComfort 35 II (Noise cancelling Off)',
        'Bose SoundLink wireless II (On)',
    ]
},
{
    manufacturer: 'Bowers & Wilkins',
    models: [
        'Bowers & Wilkins P7 Wireless (Bluetooth)',
        'Bowers & Wilkins P7 Wireless (With cable)'
    ]
},
{
    manufacturer: 'Cowin',
    models: [
        'Cowin E7 Pro (BT)',
        'Cowin E7 Pro (Noise cancelling On)'
    ]
},
{
    manufacturer: 'Creative',
    models: [
        'Creative Aurvana Live 2',
        'Creative Aurvana Live'
    ]
},
{
    manufacturer: 'Direct Sound',
    models: [
        'Direct Sound Extreme Isolation EX-25',
        'Direct Sound Extreme Isolation EX-29'
    ]
},
{
    manufacturer: 'HiFiMan',
    models: [
        'HiFiMan HE400i (2015 revision)',
        'HiFiMAN HE4XX'
    ]
},
{
    manufacturer: 'Focal',
    models: [
        'Focal Clear Professional',
        'Focal Clear',
        'Focal Elear',
        'Focal Listen Professional',
        'Focal Spirit Professional',
        'Focal Utopia'
    ]
},
{
    manufacturer: 'Fostex',
    models: [
        'Fostex T50RP (MK3)',
        'Fostex T60RP',
        'Fostex TH-X00',
        'Fostex TH610',
        'Fostex TH900 mk2 Sapphire Blue',
        'Fostex TH900 mk2'
    ]
},
{
    manufacturer: 'German Maestro',
    models: [
        'German Maestro GMP 8.35 D'
    ]
},
{
    manufacturer: 'Ghostek',
    models: [
        'Ghostek soDrop 2'
    ]
},
{
    manufacturer: 'Grado',
    models: [
        'Grado SR60e',
        'Grado SR80e'
    ]
},
{
    manufacturer: 'HyperX',
    models: [
        'HyperX Cloud Alpha',
        'HyperX Cloud II',
        'HyperX Cloud Stinger'
    ]
},
{
    manufacturer: 'JBL',
    models: [
        'JBL E55BT',
        'JBL Everest Elite 700 (Off)',
        'JBL Everest Elite 700 (On, firmware 0.7)'
    ]
},
{
    manufacturer: 'JVC',
    models: [
        'JVC HA-RX700'
    ]
},
{
    manufacturer: 'Koss',
    models: [
        'Koss Porta Pro Classic'
    ]
},
{
    manufacturer: 'KRK',
    models: [
        'KRK KNS 6400',
        'KRK KNS 8400'
    ]
},
{
    manufacturer: 'Marshall',
    models: [
        'Marshall Major II',
        'Marshall MID A.N.C. (A.N.C. Off, Bluetooth)',
        'Marshall MID A.N.C. (A.N.C. On, Bluetooth)',
        'Marshall MID A.N.C. (Off, with cable)',
        'Marshall MID A.N.C. (On, with cable)',
        'Marshall MID Bluetooth (Wireless)',
        'Marshall MID Bluetooth (With cable)',
        'Marshall Monitor',
    ]
},
{
    manufacturer: 'Master & Dynamic',
    models: [
        'Master & Dynamic MH40'
    ]
},
{
    manufacturer: 'Meze',
    models: [
        'Meze 99 Classics',
        'Meze 99 NEO'
    ]
},
{
    manufacturer: 'Monoprice',
    models: [
        'Monoprice Monolith M1060'
    ]
},
{
    manufacturer: 'NAD',
    models: [
        'NAD Viso HP50'
    ]
},
{
    manufacturer: 'Oppo',
    models: [
        'Oppo PM-3'
    ]
},
{
    manufacturer: 'Philips',
    models: [
        'Philips Fidelio X2HR',
        'Philips SHP9500',
        'Philips SHP9500S'
    ]
},
{
    manufacturer: 'Plantronics',
    models: [
        'Plantronics BackBeat Pro 2 (With cable, ANC On)'
    ]
},
{
    manufacturer: 'Pioneer DJ',
    models: [
        'Pioneer DJ HDJ-500',
        'Pioneer DJ HDJ-X5',
        'Pioneer DJ HDJ-X7',
        'Pioneer DJ HRM-5',
        'Pioneer DJ HRM-6',
        'Pioneer DJ HRM-7',
        'Pioneer SE-MS5T'
    ]
},

{
    manufacturer: 'Phonon',
    models: [
        'Phonon SMB-02'
    ]
},
{
    manufacturer: 'PreSonus',
    models: [
        'PreSonus HD 7'
    ]
},
{
    manufacturer: 'Razer',
    models: [
        'Razer Kraken Pro'
    ]
},
{
    manufacturer: 'Roland',
    models: [
        'Roland RH-300',
        'Roland RH-300V'
    ]
},
{
    manufacturer: 'Samson',
    models: [
        'Samson SR850',
        'Samson SR950'
    ]
},
{
    manufacturer: 'Sennheiser',
    models: [
        'Sennheiser HD 215-II',
        'Sennheiser HD 25 70 Ohm',
        'Sennheiser HD 25 70 Ohm (Velour earpads)',
        'Sennheiser HD 25 Light',
        'Sennheiser HD 25 Plus',
        'Sennheiser HD 25 Plus (Velour earpads)',
        'Sennheiser HD 25-C II',
        'Sennheiser HD 201',
        'Sennheiser HD 202',
        'Sennheiser HD 205',
        'Sennheiser HD 206',
        'Sennheiser HD 280 Pro',
        'Sennheiser HD 280 Pro (New facelift)',
        'Sennheiser HD 380 Pro',
        'Sennheiser HD 4.40 BT (Bluetooth)',
        'Sennheiser HD 4.40 BT (With cable)',
        'Sennheiser HD 4.50 BTNC (Bluetooth)',
        'Sennheiser HD 4.50 BTNC (With cable)',
        'Sennheiser HD 518',
        'Sennheiser HD 598',
        'Sennheiser HD 598 Cs',
        'Sennheiser HD 600',
        'Sennheiser HD 650',
        'Sennheiser HD 660 S',
        'Sennheiser HD 6XX',
        'Sennheiser HD 700',
        'Sennheiser HD 800',
        'Sennheiser HD 800 S',
        'Sennheiser Momentum On-Ear Wireless (Bluetooth)',
        'Sennheiser Momentum On-Ear Wireless (With cable)',
        'Sennheiser PX 100-II',
        'Sennheiser PXC 550 (0, Bluetooth)',
        'Sennheiser PXC 550 (0, With cable)',
        'Sennheiser PXC 550 (II, Bluetooth)',
        'Sennheiser PXC 550 (II, With cable)'
    ]
},
{
    manufacturer: 'Shure',
    models: [
        'SHURE SRH440',
        'Shure SRH840',
        'Shure SRH940',
        'SHURE SRH1440',
        'SHURE SRH1540',
        'Shure SRH1840'
    ]
},
{
    manufacturer: 'Skullcandy',
    models: [
        'Skullcandy Crusher (with battery)',
        'Skullcandy Crusher (without battery)',
        'Skullcandy Hesh 2.0',
        'Skullcandy HESH 3 Wireless (Bluetooth)',
        'Skullcandy HESH 3 Wireless (With cable)'
    ]
},
{
    manufacturer: 'Sony',
    models: [
        'Sony MDR-1000X (Headphones turned Off)',
        'Sony MDR-1000X (Noise cancelling Off)',
        'Sony MDR-1000X (Noise cancelling On)',
        'Sony MDR-1A',
        'Sony MDR-7506',
        'Sony MDR-7510',
        'Sony MDR-7520',
        'Sony MDR-CD900ST',
        'Sony MDR-V150',
        'Sony MDR-V6',
        'Sony MDR-XB450',
        'Sony MDR-XB450AP',
        'Sony MDR-XB550AP',
        'Sony MDR-XB650BT',
        'Sony MDR-XB950AP',
        'Sony MDR-XB950BT',
        'Sony MDR-Z7',
        'Sony MDR-ZX110',
        'Sony MDR-ZX110AP',
        'Sony MDR-ZX310',
        'Sony MDR-ZX310AP',
        'Sony MDR-ZX770BN (Noise cancelling On)',
        'Sony MDR-ZX770BN (Noise cancelling Off)',
        'Sony WH-1000XM2 (Ambient sound)',
        'Sony WH-1000XM2 (Headphones turned off)',
        'Sony WH-1000XM2 (Noise cancelling On)',
        'Sony WH-H900N (Ambient sound)',
        'Sony WH-H900N (Headphones turned off)',
        'Sony WH-H900N (Noise cancelling)'
    ]
},
{
    manufacturer: 'Status Audio',
    models: [
        'Status Audio CB-1'
    ]
},
{
    manufacturer: 'Superlux',
    models: [
        'Superlux HD 668B',
        'Superlux HD 681',
        'Superlux HD-330'
    ]
},
{
    manufacturer: 'Ultrasone',
    models: [
        'Ultrasone HFI-580',
        'Ultrasone Pro 580i',
        'Ultrasone Pro 780i',
        'Ultrasone Signature Studio'
    ]
},
{
    manufacturer: 'V-Moda',
    models: [
        'V-Moda Crossfade II Wireless',
        'V-Moda Crossfade M-100'
    ]
},
{
    manufacturer: 'Yamaha',
    models: [
        'Yamaha HPH-MT220',
        'Yamaha HPH-MT5',
        'Yamaha HPH-MT7',
        'Yamaha HPH-MT8'

    ]
},

];
function getHeadphoneList() {
    var headphoneList = [];
    HEADHONE_LIST.forEach(headphoneBrand =>
    {
        headphoneBrand.models.forEach(headphones =>
        {
            headphoneList.push(headphones);
        });
    });
    return headphoneList;
}

const BASE_DOMAIN = 'https://d1y7uuvij1ez9.cloudfront.net';
// const BASE_DOMAIN = 'http://faithnomore.sonarworks.com';
const PLAYER_AUDIO_BASE_URL = BASE_DOMAIN + '/audio/WEB player loops/';
const PLAYER_TRACKS = ['rock', 'pop', 'electronic'];

var PlayerAudioElement = function(src) {
    this.media = new Audio();
    this.media.preload = "none";
    this.media.loop = true;
    this.media.src = src;
    this.position = 0;
    this.loaded = 0;
    this.canplay = true;
    this.src = src;

    var self = this;

    this.media.onwaiting = function(event) {
        self.canplay = false;
    }
    this.media.oncanplay = function(event) {
        self.canplay = true;
    }
    this.media.oncanplaythrough = function(event) {
        self.canplay = true;
    }
    // var self = this;
    // this.media.onprogress = function() {
    //     if(self.media.buffered.length>0) {
    //         self.loaded = self.media.buffered.end(self.media.buffered.length-1) / self.media.duration * 100;
    //         Vue.set(self, 'loaded', self.loaded);
    //         //console.log(self.loaded);
    //     }
    // };
}
PlayerAudioElement.prototype.tick = function() {
    if(this.media.buffered.length>0) {
        this.loaded = Math.round(this.media.buffered.end(this.media.buffered.length-1) / this.media.duration * 100);
    }
    this.position = Math.round(this.media.currentTime);
};
PlayerAudioElement.prototype.play = function() {
    this.media.play();
};
PlayerAudioElement.prototype.pause = function() {
    this.media.pause();
};
PlayerAudioElement.prototype.jumpTo = function(currentTime) {
    this.media.currentTime = currentTime;
};

var PlayerAudio = function(tracks) {

    this.tracks = tracks;

    for (i = 0; i < tracks.length; ++i) {
        var track = tracks[i];
        this[track] = {
            original: new PlayerAudioElement(PLAYER_AUDIO_BASE_URL + track + '/Original.mp3'),
            calibrated: new PlayerAudioElement(''),
        };
    }
}
PlayerAudio.prototype.setHeadphones = function(headphones, track) {
    for (i = 0; i < this.tracks.length; ++i) {
        var track = this.tracks[i];
        // Fix for one specific headphones
        if (headphones === 'Blue Mo-Fi (On+)') headphones = 'Blue Mo-Fi (On)';
        this[track].calibrated.pause();
        this[track].calibrated.media.src = '';
        this[track].calibrated.media.load();
        this[track].calibrated = new PlayerAudioElement(PLAYER_AUDIO_BASE_URL + track + '/'+headphones+'.mp3');
        this[track].original.pause();
        this[track].original.jumpTo(0);
    }
};

var vm = new Vue({
    el: '#player',
    data: {
        inViewport: false,
        debug: false,
        variationId: PLAYER_VARIATION_ID,
        audio: new PlayerAudio(PLAYER_TRACKS),
        headphonesList: HEADHONE_LIST,
        calibration: false,
        playing: false,
        timesPlayed: 0,
        ct: null,
        selectHeadphonesView: 'select',
        selectedHeadphones: null,
        headphonePrompt: false,
        headphoneEntered: false,
        feature: null,
        activeTrack: PLAYER_TRACKS[0],
        tracks: PLAYER_TRACKS,
        submitHeadphonesInput: {
            model: '',
            email: '',
            modelError: false,
            emailError: false,
            notify: true,
        },
        trackInterval: null,
        playingTimeout: null,
        playingCalibrationTimeout: null,
        isBuffering: true,
        launchTime: null,
        accumulatedTime: 0,
        experienceInterval: null,
        accumulatedCalOnTime: 0,
        accumulatedCalOffTime: 0,
        lastCalibrationTime: null,
        maxExperienceTime: 300000
    },
    computed: {
        currentTrack: function() {
            return this.audio[this.activeTrack][this.calibration ? 'calibrated' : 'original'];
        }
    },
    mounted: function () {
        this.trackInterval = setInterval(this.intervalJob, 500);

        var self = this;

        inView('.player-container')
            .on('enter', function() {
                self.inViewport = true;
            })
            .on('exit', function() {
                self.inViewport = false;
            });

        $('.player-calibration-info').popover({
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-close"><i class="fa fa-times"></i></div><div class="popover-content"></div></div>',
        });
        $(document).on('click', '.popover-close', function () {
            $('.player-calibration-info').popover('hide');
        });
        $('body').on('hidden.bs.popover', function (e) {
            $(e.target).data("bs.popover").inState = { click: false, hover: false, focus: false }
        });

        this.drawCurve("Philips SHP9500", 0);
        $('.player-calibration-popover').popover({
            trigger: 'manual',
        });
    },
    watch: {
        playing: function(newVal) {
            if(newVal) {
                this.startLogPlaying();
                if(this.calibration) {
                    this.startCalibrationPlaying();
                }
            } else {
                this.stopLogPlaying();
                this.stopCalibrationPlaying();
            }
        },
        inViewport: function(inViewport) {
            if(!inViewport && this.playing) {
                this.playing = false;
                this.currentTrack.pause();
                this.stopExperience();
            }
        },
        calibration: function(newValue, oldValue) {

            if(this.ct) {
                this.ct.toggle(this.calibration ? 1 : 0);
            }

            var lastTrack = this.audio[this.activeTrack][oldValue ? 'calibrated' : 'original'];
            lastTrack.pause();
            this.currentTrack.jumpTo(lastTrack.media.currentTime);

            if(this.playing) {
                var self = this;
                setTimeout(function(){
                    self.currentTrack.play();
                    self.startLogPlaying();
                }, 100);
            }
        },
    },
    methods: {
        launchUptime: function() {
            if (this.launchTime === null) this.launchTime = new Date();

            return this.accumulatedTime + new Date().getTime() - this.launchTime.getTime();
        },
        startExperience: function() {
            trackCustom("StartedPlayerExperience", "", "", false, [], "ReferenceWeb", "WebPlayer", this.launchUptime());
        },
        trackExperience: function () {
            clearInterval(this.experienceInterval);
            if (this.accumulatedCalOnTime + this.accumulatedCalOffTime > this.maxExperienceTime) return;
            this.setCalibrationTimer();
            var self = this;
            this.experienceInterval = setInterval(function() {
                self.updateCalibrationTimer();
                if (self.accumulatedCalOnTime + self.accumulatedCalOffTime > self.maxExperienceTime) {
                    self.stopExperience();
                    return;
                }
                var event_fields = [];
                event_fields.push({
                    "Name": "TimeCalibrationOn",
                    "ValueInt": self.accumulatedCalOnTime
                });
                event_fields.push({
                    "Name": "TimeCalibrationOff",
                    "ValueInt": self.accumulatedCalOffTime
                });
                trackCustom("TimePlayed", "", "", false, event_fields, "ReferenceWeb", "WebPlayer", self.launchUptime());
            }, 5000);
        },
        stopExperience: function() {
            clearInterval(this.experienceInterval);
            this.stopCalibrationTimer();
        },
        setCalibrationTimer: function() {
            this.lastCalibrationTime = new Date();
        },
        updateCalibrationTimer: function() {
            if (this.lastCalibrationTime === null) return;
            if (this.calibration) {
                this.accumulatedCalOnTime += new Date().getTime() - this.lastCalibrationTime.getTime();
            } else {
                this.accumulatedCalOffTime += new Date().getTime() - this.lastCalibrationTime.getTime();
            }
            this.setCalibrationTimer();
        },
        stopCalibrationTimer: function() {
            this.updateCalibrationTimer();
            this.lastCalibrationTime = null;
        },
        startCalibrationPlaying: function() {
            var self = this;
            this.stopCalibrationPlaying();

            this.playingCalibrationTimeout = setTimeout(function() {
                self.showCalibrationPopover();
            }, 30000);
        },
        stopCalibrationPlaying: function() {
            clearTimeout(this.playingCalibrationTimeout);
            this.playingCalibrationTimeout = null;
        },
        showCalibrationPopover: function() {
            $('.player-calibration-popover').popover('show');
            setTimeout(function() {
                $('.player-calibration-popover').popover('hide');
            },5000)
        },
        startLogPlaying: function() {
            var self = this;
            this.stopLogPlaying();
            this.playingTimeout = setTimeout(function() {
                self.startLogPlaying();
            }, 5000);
        },
        stopLogPlaying: function() {
            clearTimeout(this.playingTimeout);
            this.playingTimeout = null;
        },
        intervalJob: function() {
            this.currentTrack.tick();

            var self = this;
            this.$nextTick(function () {
                self.isBuffering = !self.currentTrack.canplay;
            });
        },
        drawCurve: function(headphones, calibration) {
            var canvasContainer = document.getElementById('player-curve-canvas');
            var targetPath = BASE_DOMAIN + "/target355.txt";
            var that = this;

            while (canvasContainer.hasChildNodes()) canvasContainer.removeChild(canvasContainer.lastChild);
            that.ct = new FRCurveToggler (BASE_DOMAIN + "/Headphone FR Data/"+headphones+".txt", targetPath, calibration, 0 , function () {
                that.ct.appendTo(canvasContainer);
                that.ct.draw();
            });
        },
        hasSelectedHeadphones: function() {
            if(this.selectedHeadphones) {
                return true;
            }

            //this.headphonePrompt = true;
            this.selectHeadphones();
            return false;
        },
        togglePlay: function() {
            if (this.launchTime === null) {
                this.startExperience();
            }

            if(!this.hasSelectedHeadphones()) {
                return;
            }
            this.playing = !this.playing;

            var self = this;

            if(this.playing) {
                this.trackExperience();
                if(this.timesPlayed == 0) {
                    this.calibration = true;
                }

                var event_fields = [];
                event_fields.push({
                    "Name": "TrackName",
                    "ValueString": this.activeTrack
                });
                trackCustom("TrackPlayed", "", "", false, event_fields, "ReferenceWeb", "WebPlayer", this.launchUptime());

                this.$nextTick(function() {
                    self.currentTrack.play();
                    self.timesPlayed++;
                });
            } else {
                this.stopExperience();
                this.currentTrack.pause();

                trackCustom("TrackPaused", "", "", false, [], "ReferenceWeb", "WebPlayer", this.launchUptime());
            }
        },
        setTrack: function(track) {
            if (this.launchTime === null) {
                this.startExperience();
            }

            this.currentTrack.pause();
            this.activeTrack = track;

            if(this.playing) {
                this.currentTrack.play();
            }

            var event_fields = [];
            event_fields.push({
                "Name": "TrackName",
                "ValueString": this.activeTrack
            });
            trackCustom("TrackChanged", "", "", false, event_fields, "ReferenceWeb", "WebPlayer", this.launchUptime());
        },
        setHeadphones: function(headphones, brand) {
            this.calibration = false;
            this.playing = false;
            // this.activeTrack = PLAYER_TRACKS[0];

            this.selectedHeadphones = headphones;
            var event_fields = [];
            event_fields.push({
                "Name": "BrandName",
                "ValueString": brand
            });
            event_fields.push({
                "Name": "ModelName",
                "ValueString": headphones
            });
            trackCustom("HeadphoneModelSelected", "", "", false, event_fields, "ReferenceWeb", "WebPlayer", this.launchUptime());

            this.headphonePrompt = false;
            this.togglePlay();
            var self = this;
            this.$nextTick(function () {
                self.drawCurve(self.selectedHeadphones, self.calibration ? 1 : 0);
                self.audio.setHeadphones(self.selectedHeadphones);
                $('#select-headphones').modal('hide');
            });
        },
        selectHeadphones: function() {
            if (this.launchTime === null) {
                this.startExperience();
            }

            this.headphoneEntered = true;
            this.selectHeadphonesView = 'select';
            $('#select-headphones').modal('show');
        },
        closeSelectHeadphones: function() {
            $('#select-headphones').modal('hide');
        },
        openSubmitHeadphones: function() {
            trackCustom("StartedModelRequest", "", "", false, [], "ReferenceWeb", "WebPlayer", this.launchUptime());
            this.selectHeadphonesView = 'submit';

            this.submitHeadphonesInput = {
                model: '',
                email: '',
                modelError: false,
                emailError: false,
                notify: true,
            }
        },
        cancelSubmitHeadphones: function() {
            this.selectHeadphonesView = 'select';
        },
        submitHeadphones: function() {

            if(this.submitHeadphonesInput.model.length == 0) {
                this.submitHeadphonesInput.modelError = true;
            } else {
                this.submitHeadphonesInput.modelError = false;
            }

            var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(this.submitHeadphonesInput.email.length == 0 || !validateEmail.test(this.submitHeadphonesInput.email)) {
                this.submitHeadphonesInput.emailError = true;
            } else {
                this.submitHeadphonesInput.emailError = false;
            }

            if(this.submitHeadphonesInput.modelError || this.submitHeadphonesInput.emailError) {
                return false;
            }

            var event_fields = [];
            event_fields.push({
                "Name": "Email",
                "ValueString": this.submitHeadphonesInput.email
            });
            event_fields.push({
                "Name": "HPModel",
                "ValueString": this.submitHeadphonesInput.model
            });
            event_fields.push({
                "Name": "NotifyMe",
                "ValueBool": this.submitHeadphonesInput.notify
            });
            event_fields.push({
                "Name": "RequestSource",
                "ValueString": "REF"
            });
            trackCustom("HeadphoneRequest", "", "", false, event_fields, "ReferenceWeb", "WebPlayer");

            this.selectHeadphonesView = 'submit-success'
        },
        toggleCalibration: function() {
            if (this.launchTime === null) {
                this.startExperience();
            }
            this.updateCalibrationTimer();
            this.calibration = ! this.calibration;

            if (this.calibration) {
                trackCustom("TurnedCalibrationOn", "", "", false, [], "ReferenceWeb", "WebPlayer", this.launchUptime());
            } else {
                trackCustom("TurnedCalibrationOff", "", "", false, [], "ReferenceWeb", "WebPlayer", this.launchUptime());
            }
        }
    }
})