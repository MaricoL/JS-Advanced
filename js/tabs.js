var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll("section");
        this.init();
    }

    init() {
        Array.from(this.lis).forEach((li,index)=>{
            li.index = index;
            li.addEventListener("click",this.toggleTab);
        });
    }

    clearClass(){
        Array.from(this.lis).forEach((li,index)=>{
            li.className = '';
            this.sections[index].className = '';
        });
    }

    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
}
new Tab("#tabsbox");