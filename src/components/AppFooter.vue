<template>
  <!-- Footer navigation bar: sticky at the bottom, full viewport width, dark background -->
  <nav class="w-dvw flex sticky bottom-0 left-0 items-center justify-center flex-wrap gap-2 sm:gap-16 p-2 bg-[rgba(0,0,0,0.7)] z-50" aria-label="Footer">
      
      <!-- Copyright and author info -->
      <p class='text-white text-center' aria-label="Copyright © 2025 Simone Camerano">© 2025 Made with Passion by Simone Camerano</p>
      
      <!-- Social links section: GitHub, personal website, LinkedIn -->
      <div class="flex justify-center gap-4 sm:gap-2" aria-label="Social links">
        <!-- GitHub profile link -->
        <a href="https://github.com/Galdrial" target="_blank" rel="noopener" aria-label="GitHub profile">
          <img src="../assets/img/github.png" alt="GitHub" width="32" height="32" class="hover:scale-120 transition-transform duration-200" />
        </a>
        <!-- Personal website link -->
        <a href="https://simonecamerano.dev" target="_blank" rel="noopener" aria-label="Personal website">
          <img src="../assets/img/site.png" alt="Website" width="32" height="32" class="hover:scale-120 transition-transform duration-200"/>
        </a>
        <!-- LinkedIn profile link -->
        <a href="https://www.linkedin.com/in/simone-camerano/" target="_blank" rel="noopener" aria-label="LinkedIn profile">
          <img src="../assets/img/linkedin.png" alt="LinkedIn" width="32" height="32" class="hover:scale-120 transition-transform duration-200" />
        </a>
      </div>
    </nav>
</template>