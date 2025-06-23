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

const projects = [
  {
    image: 'img01.jpg',
    desc1: 'UX/UI',
    title: '프로젝트 이름',
    desc2: '(세부적인) 분야',
    desc3: '2025.3-2025.6',
    desc4: '개요',
    desc5: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. ',
    desc6: '세부설명',
    desc7: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. '
  },
  {
    image: 'img02.jpg',
    title: '프로젝트 이름 2',
    desc: '(세부적인) 분야 2\n이곳에 프로젝트에 대한 자세한 설명을 입력하세요.'
  },
  {
    image: 'img03.jpg',
    title: '프로젝트 이름 3',
    desc: '(세부적인) 분야 3\n이곳에 프로젝트에 대한 자세한 설명을 입력하세요.'
  },
  {
    image: 'img04.jpg',
    title: '프로젝트 이름 4',
    desc: '(세부적인) 분야 4\n이곳에 프로젝트에 대한 자세한 설명을 입력하세요.'
  }
];

const modal = document.getElementById('projectModal');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalDesc = modal.querySelector('.modal-desc');
const closeBtn = modal.querySelector('.close');
const prevBtn = modal.querySelector('.modal-prev');
const nextBtn = modal.querySelector('.modal-next');

let currentIdx = 0;

function showModal(idx) {
  currentIdx = idx;
  const project = projects[idx];
  modalImage.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
  modalTitle.textContent = project.title;

  // desc, desc2, desc3 등 모든 desc 속성을 배열로 모아서 출력
  let descHtml = '';
  Object.keys(project).forEach(key => {
    if (key.startsWith('desc')) {
      // desc4, desc6만 굵게
      if (key === 'desc4' || key === 'desc6') {
        descHtml += `<div style="margin-bottom:10px; font-weight:bold;">${project[key].replace(/\n/g, '<br>')}</div>`;
      } else {
        descHtml += `<div style="margin-bottom:10px;">${project[key].replace(/\n/g, '<br>')}</div>`;
      }
    }
  });
  modalDesc.innerHTML = descHtml;

  modal.style.display = 'flex';
}

function hideModal() {
  modal.style.display = 'none';
}

function showPrev() {
  showModal((currentIdx + projects.length - 1) % projects.length);
}

function showNext() {
  showModal((currentIdx + 1) % projects.length);
}

document.querySelector('.pictureBox-rectangle01').addEventListener('click', () => showModal(0));
document.querySelector('.pictureBox-rectangle02').addEventListener('click', () => showModal(1));
document.querySelector('.pictureBox-rectangle03').addEventListener('click', () => showModal(2));
document.querySelector('.pictureBox-rectangle04').addEventListener('click', () => showModal(3));

closeBtn.onclick = hideModal;
prevBtn.onclick = showPrev;
nextBtn.onclick = showNext;

modal.addEventListener('click', function(e) {
  if (e.target === modal) hideModal();
});




