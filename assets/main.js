---
---

window.onload = function() {    

    let modal = document.getElementById("modal");

    if (modal) {
        
        Array.from(document.querySelectorAll(".closeModal")).forEach(function(ele) {
            ele.onclick = function(e) {
                if (e.target != ele) return;
                closeModal();
            }
        })

        function openModal() {
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");

            document.body.classList.add("modal-open");
            document.querySelector("html").classList.add("modal-open");
            document.body.classList.add("modal-open");
        }
        function closeModal() {
            document.getElementById("modal").classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");

            document.body.classList.remove("modal-open");
            document.querySelector("html").classList.remove("modal-open");
            document.body.classList.remove("modal-open");

            let showed = document.querySelector(".project-images img.show");
            if (showed)
                showed.classList.remove("show");
        }
            
        {% assign projects = site.data.projects.projects | sort: "year" | reverse | where_exp: "proj", "proj.hidden == nil" %}
        {% for proj in projects %}
                document.getElementById("{{ proj.id }}").onclick = function(e) {
                    if (e.target.tagName == "A")
                        return;

                    document.getElementById("img-{{ proj.id }}").className = "show";
                    document.getElementById("modal-title").innerHTML = `{{ proj.title }}<br><small>{{ proj.desc }}</small>`;
                    {% if proj.award %}
                        document.getElementById("modal-award").innerHTML = `<a class="small black mb-2" href="{{proj.award.link}}">🏆 Won {{ proj.award.name }}, {{ proj.award.affiliation }}, {{ proj.award.date }} 🏆</small>`
                    {% else %}
                        document.getElementById("modal-award").innerHTML = "";
                    {% endif %}
                    document.getElementById("modal-extra").innerHTML = `{% include extra_links.html proj=proj %}`;
                    document.getElementById("modal-content").innerHTML = `{{ proj.paragraph }}`;
                    
                    openModal();
                }
        {% endfor %}
    }



}