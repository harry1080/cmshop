<div id="actionbar" class="actionbar">
    <footer>
        <ul class="clearfix">
            
            <li id="index" class="active">
                <a href="/"><span>首页</span></a>
            </li>
            <li id="category">
                <a  href="cat_all.php"><span>分类</span></a>
            </li>
            <li id="shoppingCart">
                <a href="flow.php?step=cart"><span>购物车</span><em><i id="cartNum"></i></em></a>
            </li>
            <li id="personal">
                <a  href="user.php"><span>我的</span></a>
            </li>
        </ul>
    </footer>
</div>


<script type="text/javascript">
    window.domReady = function(callback){
        if(typeof(callback)=="function"){
            document.addEventListener("DOMContentLoaded", function(event) {
                document.addEventListener("DOMContentLoaded", arguments.callee,false);
                callback(event);
            });
        }
    }

    window.domReady(function(){
        var indexpic_url = "";
        var categorypic_url = "";
        var cartpic_url = "";
        var minepic_url = "";
        if(indexpic_url && indexpic_url != ""){
            document.getElementById("index").setAttribute("style", "background-image: url(https://res.vmallres.com/pimages/" + indexpic_url + ");");
            document.getElementById("index").className+=" actionbar-img";
        }
        if(categorypic_url && categorypic_url != ""){
            document.getElementById("category").setAttribute("style", "background-image: url(https://res.vmallres.com/pimages/" + categorypic_url + ");");
            document.getElementById("category").className+=" actionbar-img";
        }
        if(cartpic_url && cartpic_url != ""){
            document.getElementById("shoppingCart").setAttribute("style", "background-image: url(https://res.vmallres.com/pimages/" + cartpic_url + ");");
            document.getElementById("shoppingCart").className+=" actionbar-img";
        }
        if(minepic_url && minepic_url != ""){
            document.getElementById("personal").setAttribute("style", "background-image: url(https://res.vmallres.com/pimages/" + minepic_url + ");");
            document.getElementById("personal").className+=" actionbar-img";
        }
    });

    document.getElementsByClassName("active")[0].setAttribute("class", "");
    if(document.getElementById(location.pathname.split("/")[1]) == null) {
        document.getElementById("index").setAttribute("class", "active");
    } else {
        document.getElementById(location.pathname.split("/")[1]).setAttribute("class", "active");
    }
</script>