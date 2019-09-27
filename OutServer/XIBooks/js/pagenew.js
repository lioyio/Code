class Page {
    constructor(parent) {
        this.parent = parent;

        this.moving = 0;
        this.fontSize = 20;
        this.lineHeight = 1.5;

        this.create();
    }
    create() {
        $(this.parent).empty();
        $(this.parent).css({
            position: "relative",
            overflow: "hidden"
        });
        $(this.parent).html(`
            <div class="Page prev">
                <div class="Text"></div>
            </div>
            <div class="Page now">
                <div class="Text"></div>
            </div>
            <div class="Page next">
                <div class="Text"></div>
            </div>
        `);
        $(".Page", this.parent).on("transitionend", event => {
            --this.moving;
            if ($(event.currentTarget).hasClass("next")) {
                $(event.currentTarget).css("z-index", "");
                $(this.parent).append($(event.currentTarget));
            }
            if ($(event.currentTarget).hasClass("prev")) {
                $(event.currentTarget).css("z-index", "");
                $(this.parent).prepend($(event.currentTarget));
            }
        }).click(event => {
            if (this.moving != 0) {
                return;
            }
            const width = $(".now").width();
            const height = $(".now").height();
            if (event.clientX > width * 3 / 4 ||
                (event.clientX > width / 4 && event.clientY > height * 3 / 4)) {
                this.moving = 6;
                let next = $(".next").removeClass("next");
                $(".prev").addClass("next").removeClass("prev").css("z-index", "-1");
                $(".now").addClass("prev").removeClass("now");
                next.addClass("now");
            } else if (event.clientX < width / 4 ||
                (event.clientX < width * 3 / 4 && event.clientY < height / 4)) {
                this.moving = 6;
                let prev = $(".prev").removeClass("prev");
                $(".next").addClass("prev").removeClass("next").css("z-index", "-1");;
                $(".now").addClass("next").removeClass("now");
                prev.addClass("now");
            }
        });
    }
    renderText(text) {
        $(".Text").html(text);
    }
}
