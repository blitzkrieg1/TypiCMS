function initTinymce(selector) {
    tinymce.init({
        element_format : "html",
        selector: selector,
        fix_list_elements : true,
        height : 400,
        menubar: false,
        entity_encoding : 'raw',
        plugins: 'paste,table,nonbreaking,link,code,image',
        paste_as_text: true,
        relative_urls: false,
        file_browser_callback: function(field_name, url, type, win) {
        	// Help : http://www.tinymce.com/forum/viewtopic.php?id=30861&p=2
            tinymce.activeEditor.windowManager.open({
                title: 'Choose image',
                url: '/admin/files?type=i&filepicker=1',
                width: 832,
                height: 550
            }, {
                oninsert: function(url) {
                	fieldElm = win.document.getElementById(field_name);
                    fieldElm.value = url;
                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("change", false, true);
                        fieldElm.dispatchEvent(evt);
                    } else {
                        fieldElm.fireEvent("onchange");
                    }
                }
            });
        },
        // statusbar: false,
        block_formats : "Paragraph=p;Code=pre;Blockquote=blockquote;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6",
        style_formats : [
            { title: 'Image Left', selector: 'img', styles: { 'float': 'left', 'margin': '0 20px 20px 0'}},
            { title: 'Image Right', selector: 'img', styles: { 'float': 'right', 'margin': '0 0 20px 20px'}},
            {title : 'File (link)', inline : 'a', classes : 'file'},
            {title : 'Button (link)', inline : 'a', classes : 'btn btn-default'},
        ],
        content_css : '/css/public.css,/components/tinymce/css/tiny_mce.css',
        toolbar: 'formatselect | styleselect | bold italic | subscript superscript | bullist numlist outdent indent | link unlink | alignleft aligncenter alignright alignjustify | table | nonbreaking | image | code',
        language_url: '/components/tinymce/langs/fr.js'
    });
}

!function( $ ){

    "use strict";

    $(function () {

        for (var i = 0; i < langues.length; i++) {
            var titleField = $('#' + langues[i] + '\\[title\\]');
            titleField.slug({
                slugField: '#' + langues[i] + '\\[slug\\]'
            });
        };
        var titleField = $('#title');
        titleField.slug({
            slugField: '#slug'
        });

        if ($('.editor').length) {
            initTinymce('.editor');
        }

        if ($('#tags').length) {
            var tags = $.getJSON("/admin/tags", function(data){
                $('#tags').select2({
                    tags: data,
                    tokenSeparators: [',']
                });
            })
        }

        // Set tab in red on validation errors
        var firstErrorTabActive = false;
        $('.tab-pane').each(function(index, el) {
            if ($(this).find('.has-error').length) {
                if ( ! firstErrorTabActive) {
                    $('a[href="#' + $(this).attr('id') + '"]').tab('show');
                    firstErrorTabActive = true;
                }
                $('a[href="#' + $(this).attr('id') + '"]').addClass('text-danger');
            };
        });

        if ($('.picker-date').length) {
            $('.picker-date').datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                },
                format: 'DD.MM.YYYY',
                pickTime: false,
                language: lang
            });
            $('.picker-date-start').on('dp.change', function (e) {
                $('.picker-date-end').data('DateTimePicker').setMinDate(e.date);
            });
            $('.picker-date-end').on('dp.change', function (e) {
                $('.picker-date-start').data('DateTimePicker').setMaxDate(e.date);
            });
        };

        if ($('.picker-datetime').length) {
            $('.picker-datetime').datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                },
                format: 'DD.MM.YYYY HH:mm',
                useSeconds: false,
                language: lang
            });
        };

        if ($('.picker-time').length) {
            $('.picker-time').datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                },
                format: 'HH:mm',
                pickDate: false,
                language: lang
            });
        };

    });

}( window.jQuery || window.ender );
