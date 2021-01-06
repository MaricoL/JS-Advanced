var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.ul = this.main.querySelector("ul");
        // this.lis = this.main.querySelectorAll('li');
        this.tabscon = this.main.querySelector(".tabscon");
        // this.sections = this.main.querySelectorAll("section");
        this.tabadd = this.main.querySelector(".tabadd");
        this.init();
    }

    init() {
        this.updateNode();
        this.tabadd.addEventListener("click", this.addTab);
        Array.from(this.lis).forEach((li, index) => {
            li.index = index;
            li.addEventListener("click", this.toggleTab);
        });
        Array.from(this.removes).forEach(icon => {
            icon.addEventListener("click", this.removeTab);
        });
        Array.from(this.spans).forEach(span => {
            span.addEventListener("dblclick", this.editTab);
        });
        Array.from(this.sections).forEach(section => {
            section.addEventListener("dblclick", this.editTab);
        });
    }

    // 重新获取节点
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll("section");
        this.removes = this.main.querySelectorAll("i");
        this.spans = this.ul.querySelectorAll("li span:first-child");
    }

    // 清除样式
    clearClass() {
        Array.from(this.lis).forEach((li, index) => {
            li.className = '';
            this.sections[index].className = '';
        });
    }

    // 切换选项卡
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    // 添加选项卡
    addTab() {
        that.clearClass();
        var li = `<li class="liactive"><span>新选项卡</span><i class="fa fa-window-close"></i></li>`;
        var section = `<section class="conactive">new section` + Math.random() + `</section>`;
        that.ul.insertAdjacentHTML("beforeend", li);
        that.tabscon.insertAdjacentHTML("beforeend", section);
        that.init();
    }

    // 删除选项卡
    removeTab(e) {
        // 阻止事件冒泡，避免点击选项卡
        e.stopPropagation();
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        // 如果删除的是选中状态的，则将前一个选项卡设置为选中状态
        // 否则，直接推出
        if (document.querySelector('.liactive')) return;
        index--;
        index = index >= 0 ? index : index + 2;
        // 手动触发点击事件
        that.lis[index] && that.lis[index].click();
    }

    // 编辑选项卡
    editTab(){
        var str = this.innerHTML;
         // 双击禁止选定文字
         window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
         this.innerHTML = `<input type="text"/>`;
         var input = this.children[0];
         input.value = str;
         // 文本框处于选中状态
         input.select();
        //  input.addEventListener("blur",()=>{this.parentNode.innerHTML = this.value});
        // e.target为input标签
         input.addEventListener("blur",(e)=>e.target.parentNode.innerHTML = e.target.value);
         input.addEventListener("keyup",(e)=>{
             if(e.keyCode === 13){
                e.target.blur();
             }
         });
    }


}


new Tab("#tabsbox");