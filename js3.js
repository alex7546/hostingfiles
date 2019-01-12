$('.ui.dropdown').dropdown();

var JD = 1
var user = "";
var rawfollowers = 0;
var rawfollowing = 0;

function omega(LOL) {
    $.ajax({
    url: 'grab.php?u=' + LOL,
    success: function(data) {
        if (!data.includes("HTTP request failed!")) {
        var darray = data.split('<br>');
        var username = "@" + darray[0];
        var fullname = darray[1];
        fullname = JSON.parse('"' + fullname + '"');
        var bio = darray[2];
        bio = JSON.parse('"' + bio + '"');
        var avatar = darray[3];
        var isprivate = darray[4];
        var media = darray[5];
        var followers = numeral(darray[6]).format("0a");
        rawfollowers = darray[6];
        var following = numeral(darray[7]).format("0a");
        rawfollowing = darray[7];
        var json = darray[8];
        //console.log(json)
        //console.log('Username: ' + username);
        //console.log('Full name: ' + fullname);\
        //console.log('Bio: ' + bio);
        //console.log('Avatar: ' + avatar);
        //console.log('Is private: ' + isprivate);
        //console.log('Followers: ' + followers);
        //console.log('Following: ' + following);
        //console.log('Media count: ' + media);
        if (json.length > 100) {
            var xD = $.parseJSON(json.replace(/&quot;/g,'"'));

        xD.forEach(function(Dx) {
            
            try {
                var description = Dx.node.edge_media_to_caption.edges[0].node.text;
            }

            catch (captionE) {
                var description = 'EMPTY'
            }

            var disabled = Dx.node.comments_disabled;

            var image = Dx.node.display_url;

            var likes = numeral(Dx.node.edge_liked_by.count).format("0a");

            var comments = '';

            if (disabled == false) {

                try {
                    var comments = numeral(Dx.node.edge_media_to_comment.count).format("0a");
                }
                
                catch (commentsE) {
                    var comments = 'DISABLED';
                }

            } else {
                comments = 'DISABLED'
            }

            $('.ig-posts').append('<div class="ig-post"><div class="ig-image" style="background-image: url(' + image + ');"><div class="ig-extras" id="ig-' + JD + '"><i class="heart icon"></i><span id="ig-' + JD + '-XD">' + likes + '</span></div></div></div>')

            JD += 1;

            //console.log('Likes: ' + likes + ', Comments: ' + comments + ', Description: ' + description + ', Image: ' + image);

            //if (comments == 'DISABLED' || comments == 0) {

                //$('.ig-posts').append('<div class="ig-post"><div class="ig-image" style="background-image: url(' + image + ');"><div class="ig-extras"><i class="heart icon"></i>' + likes + '</div></div></div>')

            //} else {

                //$('.ig-posts').append('<div class="ig-post"><div class="ig-image" style="background-image: url(' + image + ');"><div class="ig-extras"><i class="heart icon"></i>' + likes + '<i class="flipped comment icon"></i>' + comments + '</div></div></div>')

            //}


        });

        $(".sip").show();
        $(".ui.header.h4-bottom").css("margin-bottom", "-0.5rem");


        } else {

        $(".sip").hide();
        $(".ui.header.h4-bottom").css("margin-bottom", "0");

        }

        $(".ig-avatar").attr("src", avatar);
        $(".ig-username").text(username);
        $(".ig-fullname").text(fullname);
        $(".ig-bio").text(bio);

        $(".media-c").text(media);

        if (rawfollowers > 10000) {
            $(".followers-c").text(followers)
        } else {
            $(".followers-c").text(rawfollowers)
        }

        if (rawfollowing > 5000) {
            $(".following-c").text(following)
        } else {
            $(".following-c").text(rawfollowing)
        }

        $(".bad-name").fadeOut("slow");

        $(".step-1").fadeOut("slow", function() {
            $(".step-2").fadeIn("slow");
        })
    } else {
        $(".hw").text("Username is wrong.");
        $(".bad-name").fadeIn("slow");
        $(".c-btn").removeClass("disabled");

    }

    }
})
}

function check() {
    if ($("#igus").val() != "") {
    $(".c-btn").addClass("disabled");
    var igus = $("#igus").val().replace("@", "");
    user = igus;
    omega(igus);
} else {

    $(".hw").text("Username is empty.");
    $(".bad-name").fadeIn("slow");
    $(".c-btn").removeClass("disabled");

}

}

function no() {
    $(".step-2").fadeOut("slow", function() {
            $("#igus").val("");
            $(".c-btn").removeClass("disabled");
            $(".ig-posts").empty();
            $(".step-1").fadeIn("slow");
        })
}

function yes() {

    $(".yesno").fadeOut("slow");

    $(".isthis").fadeOut("slow", function() {

        $(".step-4").fadeIn("slow");

    })

    //$(".lvis").text("@" + user + " last visitors")
    //$('.visitors').append('<div class="visitor"> <h5 class="ui header">' + "@" + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) +'<ago> | ' + chance.integer({ min: 1, max: 15 }) + ' minutes ago</ago></h5> <div class="ui centered three column grid"> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 1, max: 100 }) + '</h6> <h6 class="ui header h4-bottom">posts</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 50, max: 500 }) + '</h6> <h6 class="ui header h4-bottom">followers</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 25, max: 1000 }) + '</h6> <h6 class="ui header h4-bottom">following</h6> </div> </div> <div class="ui divider chuj"></div> </div>')
    //$('.visitors').append('<div class="visitor"> <h5 class="ui header">' + "@" + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) +'<ago> | ' + chance.integer({ min: 1, max: 15 }) + ' minutes ago</ago></h5> <div class="ui centered three column grid"> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 1, max: 100 }) + '</h6> <h6 class="ui header h4-bottom">posts</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 50, max: 500 }) + '</h6> <h6 class="ui header h4-bottom">followers</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 25, max: 1000 }) + '</h6> <h6 class="ui header h4-bottom">following</h6> </div> </div> <div class="ui divider chuj"></div> </div>')
    //$('.visitors').append('<div class="visitor"> <h5 class="ui header">' + "@" + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) +'<ago> | ' + chance.integer({ min: 1, max: 15 }) + ' minutes ago</ago></h5> <div class="ui centered three column grid"> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 1, max: 100 }) + '</h6> <h6 class="ui header h4-bottom">posts</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 50, max: 500 }) + '</h6> <h6 class="ui header h4-bottom">followers</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 25, max: 1000 }) + '</h6> <h6 class="ui header h4-bottom">following</h6> </div> </div> <div class="ui divider chuj"></div> </div>')
    //$('.visitors').append('<div class="visitor"> <h5 class="ui header">' + "@" + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 1 }), pool: '*' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789' }) + chance.string({ length: chance.integer({ min: 1, max: 2 }), pool: '*' }) +'<ago> | ' + chance.integer({ min: 1, max: 15 }) + ' minutes ago</ago></h5> <div class="ui centered three column grid"> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 1, max: 100 }) + '</h6> <h6 class="ui header h4-bottom">posts</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 50, max: 500 }) + '</h6> <h6 class="ui header h4-bottom">followers</h6> </div> <div class="center aligned column"> <h6 class="ui header h4-top">' + chance.integer({ min: 25, max: 1000 }) + '</h6> <h6 class="ui header h4-bottom">following</h6> </div> </div> <div class="ui divider chuj"></div> </div>')
    //$(".step-2").fadeOut("slow", function() {
        //$(".step-3").fadeIn("slow");
    //})
}

function addfl() {

    $(".addfl").addClass("disabled");

    var options = {
    â€ƒâ€ƒuseEasing: false, 
    â€ƒâ€ƒuseGrouping: false, 
    â€ƒâ€ƒseparator: '', 
    â€ƒâ€ƒdecimal: '', 
    };

    var fl = new CountUp('followers-c', parseInt(rawfollowers), (parseInt(rawfollowers) + parseInt($('.ui.dropdown.followers').dropdown('get value'))), 0, 5, options);
    fl.start(function() {
        setTimeout(function() {
            $(".step-4").fadeOut("slow", function() {
                $(".step-5").fadeIn("slow");
            })
        }, 500);
    });

    $(".ig-extras").each(function() {
        var ajdi = $(this).attr("id") + "-XD";
        var like = new CountUp(ajdi, parseInt($(this).text()), (parseInt($(this).text()) + parseInt($('.ui.dropdown.likes').dropdown('get value'))), 0, 5, options);
        like.start();
    })

}

document.querySelector("#igus").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    document.querySelector("#cbtn").click(); // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});
