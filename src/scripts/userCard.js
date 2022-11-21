const template = document.createElement("template");
template.innerHTML = `
  <section class="user-container">
  
    <div class="user-avatar">
      <img  />
    </div>
     
    <div class="info-wrapper">

      <div class="user-info">
        <h3></h3>
        
        <span><slot name="role"/></span>
        <small><slot name="email"/></small>
        <small><slot name="phone"/></small>
      </div>

      <div class="rating">
        <slot name="rating"></slot>
      </div>

    </div>
  </section>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  build() {
    this.showInfo = true;

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    this.shadow.appendChild(this.styles());

    this.shadow.querySelector("h3").innerText = this.getAttribute("name");
    this.shadow.querySelector("img").src = this.getAttribute("avatar");
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadow.querySelector(".user-card .info");
    const toggleBtn = this.shadow.querySelector("#toggle-info");

    if (this.showInfo) {
      info.style.display = "block";
      toggleBtn.innerText = "Hide info";
    } else {
      info.style.display = "none";
      toggleBtn.innerText = "Show info";
    }
  }

  /* Lifecycle Callbacks */
  connectedCallback() {
    this.shadow.querySelector("#toggle-info").addEventListener("click", () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadow.querySelector("#toggle-info").removeEventListener();
  }

  /* Apply css styles to the shadow DOM */
  styles() {
    const style = document.createElement("style");
    style.textContent = `
      .user-container {         
        background: #faf5f5;
        border-radius: 12px;
        color:  black;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12),0 16px 16px rgba(0,0,0,0.12);
        padding: 1rem;

       display: grid;
       grid-template-columns: 140px 1fr;
       align-items: center;        
      }           

     .user-container .info-wrapper {
        padding-left: 1rem;
      }

      .user-container .info-wrapper h3 {
        font-size: 1.5rem;
        margin-bottom: 12px;
        color: #dc851f;
        font-weight: 700;
      }

      .user-container .info-wrapper span {
        font-weight: 600;
        color: #7e5920;
        margin-bottom: 4px;
        opacity: 0.8;
      }

      .user-container .info-wrapper small {
        opacity: 0.6;        
      }

     .user-container .info-wrapper span, .info-wrapper small {
        display: block
      }

      .user-container .user-avatar {
        width: 8.2rem;
        height: 8.2rem;
        border-radius: 100%;
        box-shadow: 0 1px 1px rgba(52, 51, 48, 0.25), 
        0 2px 2px rgba(52, 51, 48, 0.20), 
        0 4px 4px rgba(52, 51, 48, 0.15), 
        0 8px 8px rgba(52, 51, 48, 0.10),
        0 16px 16px rgba(52, 51, 48, 0.05);     
        overflow: hidden;

      }

     .user-container .user-avatar img { 
        display: block;
        width: 100%;
        object-fit: cover;
      }

       .user-container .rating {
        margin-left: -4px;
       }

      .user-container .visibility-options img {
        width: 25px;
        cursor: pointer;
      }
     `;

    return style;
  }
}

customElements.define("user-card", UserCard);
