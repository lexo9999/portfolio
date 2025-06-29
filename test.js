const wrap = document.getElementsByClassName('wrap')[0]; // 보일 영역
const container = document.querySelectorAll('.container'); // ← 이 부분만 변경!
const topButton = document.getElementById('topButton');
const navLinks = document.querySelectorAll('.gnb__item a');
const contactButton = document.getElementById('contactButton');
let page = 0;
const lastPage = container.length - 1;
let isScrolling = false;

// 활성화된 네비게이션 링크 업데이트
const updateActiveNavLink = () => {
    navLinks.forEach((link, index) => {
        if (index + 2 === page && page >= 2) { // section03부터 시작하므로 +2, 섹션 3 이상일 때만 활성화
            link.classList.add('active'); // 현재 섹션에 해당하는 링크에 클래스 추가
        } else {
            link.classList.remove('active'); // 다른 링크에서 클래스 제거
        }
    });
};

// 스크롤 이벤트 핸들러
window.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isScrolling) return; // 스크롤 중이면 무시

    isScrolling = true; // 스크롤 중으로 설정

    if (e.deltaY > 0) {
        page++;
    } else if (e.deltaY < 0) {
        page--;
    }

    if (page < 0) {
        page = 0;
    } else if (page > lastPage) {
        page = lastPage;
    }

    wrap.style.top = page * -100 + 'vh';

    // 맨 위로 버튼 및 Contact 버튼 표시/숨김
    if (page > 0) {
        topButton.classList.add('show');
        contactButton.classList.add('show'); // Contact 버튼 표시
    } else {
        topButton.classList.remove('show');
        contactButton.classList.remove('show'); // Contact 버튼 숨김
    }

    updateActiveNavLink(); // 활성화된 네비게이션 링크 업데이트

    // 일정 시간 후 스크롤 가능 상태로 변경
    setTimeout(() => {
        isScrolling = false;
    }, 500); // 500ms 동안 스크롤 차단
}, { passive: false }); // 디폴트 기능 제거 - 스크롤

// 네비게이션 클릭 이벤트 핸들러
navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // 클릭한 링크의 href 속성에서 섹션 ID 추출
        const targetId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // 해당 섹션으로 이동
            const targetIndex = Array.from(container).indexOf(targetSection);
            page = targetIndex;
            wrap.style.top = page * -100 + 'vh';

            updateActiveNavLink(); // 활성화된 네비게이션 링크 업데이트
        }
    });
});

// Contact 버튼 클릭 이벤트
contactButton.addEventListener('click', () => {
    const contactSection = document.getElementById('section08'); // 이동할 섹션
    if (contactSection) {
        page = Array.from(container).indexOf(contactSection);
        wrap.style.top = page * -100 + 'vh';

        // Contact 버튼 클릭 시에도 "맨 위로" 버튼 유지
        if (page > 0) {
            topButton.classList.add('show');
        }

        updateActiveNavLink(); // 활성화된 네비게이션 링크 업데이트
    }
});

// 맨 위로 이동
topButton.addEventListener('click', () => {
    wrap.style.top = '0vh';
    page = 0; // 페이지 초기화
    topButton.classList.remove('show'); // 버튼 숨김

    updateActiveNavLink(); // 활성화된 네비게이션 링크 업데이트
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeModal = document.querySelector(".close");
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  let currentIndex = 0; // 현재 표시 중인 이미지의 인덱스
  const pictureBoxes = Array.from(
    document.querySelectorAll("[class^='pictureBox-rectangle']")
  );

  // 모달 열기
  const openModal = (index) => {
    const element = pictureBoxes[index];
    const imageSrc = element.getAttribute("data-image");
    const title = element.getAttribute("data-title");
    const subtitle = element.getAttribute("data-subtitle");
    const desc = element.getAttribute("data-desc");

    // 모달에 데이터 삽입
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalDesc.innerHTML = desc;

    // 모달 표시
    modal.style.display = "block";
    currentIndex = index;
  };

  // 모달 닫기
  const closeModalHandler = () => {
    modal.style.display = "none";
  };

  // 이전 사진으로 이동
  const showPrev = () => {
    currentIndex = (currentIndex - 1 + pictureBoxes.length) % pictureBoxes.length;
    openModal(currentIndex);
  };

  // 다음 사진으로 이동
  const showNext = () => {
    currentIndex = (currentIndex + 1) % pictureBoxes.length;
    openModal(currentIndex);
  };

  // 모든 pictureBox-rectangle 요소에 클릭 이벤트 추가
  pictureBoxes.forEach((element, index) => {
    element.addEventListener("click", () => openModal(index));
  });

  // 화살표 및 닫기 버튼 이벤트 추가
  closeModal.addEventListener("click", closeModalHandler);
  prevArrow.addEventListener("click", showPrev);
  nextArrow.addEventListener("click", showNext);

  // 모달 외부 클릭 시 닫기
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModalHandler();
    }
  });
});

// Floating 요소 생성 및 추가
function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.classList.add('floating-container');

    // 동그라미 6개 생성
    for (let i = 0; i < 6; i++) { 
        const floatingItem = document.createElement('div');
        floatingItem.classList.add('floating-item');

        // 랜덤 크기 설정 (최소 30px ~ 최대 100px)
        const size = Math.random() * 70 + 30; // 30 ~ 100px
        floatingItem.style.width = `${size}px`;
        floatingItem.style.height = `${size}px`;

        // 랜덤 위치 설정
        floatingItem.style.top = `${Math.random() * 100}%`;
        floatingItem.style.left = `${Math.random() * 100}%`;

        // 랜덤 애니메이션 속도 설정 (8초 ~ 20초)
        floatingItem.style.animationDuration = `${8 + Math.random() * 12}s`;

        // 랜덤 애니메이션 딜레이 설정
        floatingItem.style.animationDelay = `${Math.random() * 5}s`;

        floatingContainer.appendChild(floatingItem);
    }

    document.body.appendChild(floatingContainer);
}

// 페이지 로드 시 floating 요소 추가
window.addEventListener('DOMContentLoaded', createFloatingElements);




