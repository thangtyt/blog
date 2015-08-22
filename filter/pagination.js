/**
 * Created by nguyenthang on 8/20/15.
 */
'use strict'
module.exports = function (total_page,curr_page,link) {
    //console.log(total_page +' -- page : '+ curr_page +' -- link : '+link);
    curr_page = Number(curr_page);
    let html='';
    if (total_page <= 1){
        return html;
    }else{
        html = ' <div class="col-sm-12">'+
                    '<div class="dataTables_paginate paging_simple_numbers" id="dataTables-example_paginate">'+
                        '<ul class="pagination">';

                                html +='<li class="paginate_button previous ';
                                                                    if (curr_page == 1)html+='disabled';
                                                                            html+='" aria-controls="dataTables-example" tabindex="0" id="dataTables-example_previous">'+
                                            '<a href="'+link.replace('{page}',curr_page-1)+'">Previous</a>'+
                                        '</li>';

                            for (let i = 1 ; i <= total_page ; i++){
                                html+='<li class="paginate_button ';
                                            if (i==curr_page){
                                                html+='active'
                                            }
                                            html+='" aria-controls="dataTables-example" tabindex="0">'+
                                            '<a href="'+link.replace('{page}',i)+'">'+i+'</a>'+
                                        '</li>';
                            }
                                html+='<li class="paginate_button next ';if (curr_page == total_page)html+='disabled';html+='" aria-controls="dataTables-example" tabindex="0" id="dataTables-example_next">'+
                                '<a href="'+link.replace('{page}',curr_page+1)+'">Next</a>'+
                                '</li>';

                        html+='</ul>'+
                    '</div>'+
                '</div>';
    }

    return html;
}