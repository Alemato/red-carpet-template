/**
 *
 *    [SOW] Vendor Bilerplate : STARTUP|EXAMPLE
 *
 *    @author        Alessandro Mattei
 *
 *
 *    @Dependency    -
 *    @Usage            $.SOW.vendor.select2.init(.select2, config)
 *    @Ajax Support    NO

 ***********************************************************************************************************
 ALREADY BINDED AND READY TO USE
 $.SOW.globals.direction                            'ltr|rtl'
 $.SOW.globals.width                                actual width        (updated on resize)
 $.SOW.globals.is_mobile                            true|false
 $.SOW.globals.is_admin                                true|false            (admin layout if body.layout-admin)
 $.SOW.globals.elBody                                body element        $('body')
 $.SOW.globals.elHeader                                header element        $('#header')
 $.SOW.globals.elAside                                main sidebar element        $('#aside-main')
 $.SOW.globals.breakpoints.[sm|md|lg|xl]                sm = 576
 md = 768
 lg = 992
 xl = 1200

 HELPERS
 $.SOW.helper.consoleLog('...message');                debugging purpose only - debug must be enabled in config
 $.SOW.helper.check_var(variable);                    check variable (return null if undefined)
 $.SOW.helper.randomStr(8);                            generate random string
 * see sow.helper.js for more

 AJAX REINIT
 $.SOW.reinit('#container')                            reinit plugins for a specific ajax container; see also:
 config: sow__plugins_autoinit
 ***********************************************************************************************************

 *
 *
 **/

;(function ($) {
    'use strict';


    /**
     *
     *    @vars
     *
     *
     **/
    var scriptName = 'select2'; 	// CHANGE THIS
    var scriptInfo = 'Select2';


    $.SOW.vendor.select2 = {


        /**
         *
         *    @config
         *
         *
         **/
        config: {
            placeholder: 'Seleziona',
            minimumInputLength: 1,
            allowClear: false,
            closeOnSelect: true,
            debug: false,
            dir: 'ltr',
            disabled: false,
            language: 'it',
            multiple: false,
            width: '100%',
            scrollAfterSelect: false
        },


        /**
         *
         *    @collection
         *
         *
         **/
        collection: $(),


        /**
         *
         *    @init
         *
         *
         **/
        init: function (selector, config) {

            // Check Vendor ; dymanically load if missing (should be external)
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if (selector != '') {
                if (jQuery(selector).length < 1)
                    return null;
            }

            if (!jQuery().select2) {

                var paths = $.SOW.helper.vendorLogicPaths(scriptName);
                if (paths['path_js'] == '') {
                    $.SOW.helper.consoleLog('Vendor Missing 1 : ' + scriptInfo);
                    return null;
                }

                $.SOW.helper.loadScript([paths['path_js']], false, true).done(function () {
                    if (!jQuery().select2) {
                        $.SOW.helper.consoleLog('Vendor Missing 2  : ' + scriptInfo);
                        return null;
                    }

                    // self reinit, external js loaded!
                    $.SOW.vendor.select2.init(selector, config);
                    return null;

                });

                return null;
            }
            // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


            // Check vendor
            if (!jQuery().select2) {
                $.SOW.helper.consoleLog('Vendor Missing 3 : ' + scriptInfo);
                return;
            }


            var __selector = $.SOW.helper.__selector(selector);
            var __config = $.SOW.helper.check_var(config);

            this.selector = __selector[0]; 	// '#selector'
            this.collection = __selector[1]; 	// $('#selector')
            this.selector_orig = __selector[2]; 	// $('#selector') // without ajax container prefix
            this.config = (__config !== null) ? $.extend({}, this.config, __config) : this.config;


            // -- * --
            $.SOW.helper.consoleLog('Init : ' + scriptInfo);
            // -- * --


            // 1. Has no selector
            if (!this.selector) {
                $.SOW.vendor.select2.process($('.select2'));
                return $('.select2');
            }

            // 2. Has selector
            return this.collection.each(function () {
                $.SOW.helper.consoleLog($(this));
                $.SOW.vendor.select2.process($(this));

            });

        },


        /**
         *
         *    @process
         *
         *
         **/
        process: function (_this) {
            if (_this.hasClass('js-select2ed'))
                return;



            var select2ID = _this.attr('id') || '',
                placeholder = _this.attr('placeholder') || $.SOW.vendor.select2.config.placeholder,
                minimumInputLength = _this.attr('data-input-min-length') || $.SOW.vendor.select2.config.minimumInputLength,
                allowClear = _this.attr('data-allowclear') || $.SOW.vendor.select2.config.allowClear,
                closeOnSelect = _this.attr('data-closeonselect') || $.SOW.vendor.select2.config.closeOnSelect,
                debug = $.SOW.vendor.select2.config.debug,
                dir = $.SOW.globals.direction,
                disabled = !!(_this.attr('disabled')),
                language = _this.attr('language') || $.SOW.vendor.select2.config.language,
                multiple = !!(_this.attr('multiple')),
                width = _this.attr('width') ||  $.SOW.vendor.select2.config.width,
                scrollAfterSelect = _this.attr('data-scrollafterselect') || $.SOW.vendor.select2.config.scrollAfterSelect,
                config = $.SOW.vendor.select2.config;

            _this.addClass('js-select2ed');

            // Add random ID if doesn't one
            if (select2ID == '') {
                select2ID = 'rand_' + $.SOW.helper.randomStr(3, 'N');
                _this.attr('id', select2ID);
            }

            if(_this.attr("data-ajax-method")){
                $.SOW.vendor.select2.fromAjax(_this);
                return;
            }
            // Init select2
            $('#' + select2ID).select2({
                placeholder: placeholder,
                minimumInputLength: minimumInputLength,
                allowClear: allowClear,
                closeOnSelect: closeOnSelect,
                debug: debug,
                dir: dir,
                disabled: disabled,
                language: language,
                multiple: multiple,
                width: width,
                scrollAfterSelect: scrollAfterSelect
            });

        },
        fromAjax: function (_this){
            var select2ID = _this.attr('id') || '',
                placeholder = _this.attr('placeholder') || $.SOW.vendor.select2.config.placeholder,
                minimumInputLength = _this.attr('data-input-min-length') || $.SOW.vendor.select2.config.minimumInputLength,
                allowClear = _this.attr('data-allowclear') || $.SOW.vendor.select2.config.allowClear,
                closeOnSelect = _this.attr('data-closeonselect') || $.SOW.vendor.select2.config.closeOnSelect,
                debug = $.SOW.vendor.select2.config.debug,
                dir = $.SOW.globals.direction,
                disabled = !!(_this.attr('disabled')),
                language = _this.attr('language') || $.SOW.vendor.select2.config.language,
                multiple = !!(_this.attr('multiple')),
                width = _this.attr('width') ||  $.SOW.vendor.select2.config.width,
                scrollAfterSelect = _this.attr('data-scrollafterselect') || $.SOW.vendor.select2.config.scrollAfterSelect,
                method= _this.attr('data-ajax-method')||"GET",
                url= _this.attr('data-ajax-url') || "",
                config = $.SOW.vendor.select2.config;

            $('#' + select2ID).select2({
                ajax: {
                    method:method,
                    url: url,
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            q: params.term,
                            page: params.page
                            // url?q=[testo_barra_ricerca]&page=[pagina]
                        };
                    },
                    processResults: function (data, params) {
                        // parse the results into the format expected by Select2
                        // since we are using custom formatting functions we do not need to
                        // alter the remote JSON data, except to indicate that infinite
                        // scrolling can be used
                        params.page = params.page || 1;

                        return {
                            results: data.items,
                            pagination: {
                                more: (params.page * 30) < data.total_count
                            }
                        };
                    },
                    cache: true
                },
                placeholder: placeholder,
                minimumInputLength: minimumInputLength,
                allowClear: allowClear,
                closeOnSelect: closeOnSelect,
                debug: debug,
                dir: dir,
                disabled: disabled,
                language: language,
                multiple: multiple,
                width: width,
                scrollAfterSelect: scrollAfterSelect,
                templateResult: formatRepo,
                templateSelection: formatRepoSelection
            });

            function formatRepo (repo) {
                if (repo.loading) {
                    return repo.text;
                }

                var $container = $(
                    "<div class='select2-result-repository clearfix'>" +
                    "<div class='select2-result-repository__avatar'><img class='' src='" + repo.avatar_url + "'  alt='avatar'/></div>" +
                    "<div class='select2-result-repository__meta'>" +
                    "<div class='select2-result-repository__title '></div>" +
                    "<div class='select2-result-repository__description'></div>" +
                    "</div>" +
                    "</div>"
                );

                $container.find(".select2-result-repository__title").text(repo.full_name);
                $container.find(".select2-result-repository__description").text(repo.description);

                return $container;
            }

            function formatRepoSelection (repo) {
                return repo.full_name || repo.text;
            }
        }
    };


})(jQuery);

