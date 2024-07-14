document.addEventListener('DOMContentLoaded', function() {
    // Ao carregar a página, exibir os detalhes da primeira vaga
    showJobDetails('job1');
});

function showJobDetails(jobId) {
    var jobCards = document.getElementsByClassName('job-detail-card');
    for (var i = 0; i < jobCards.length; i++) {
        jobCards[i].style.display = 'none';
    }
    document.getElementById(jobId).style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterJobs() {
    var input, filter, jobListings, jobCards, title, company, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toLowerCase();
    jobListings = document.getElementById('jobListings');
    jobCards = jobListings.getElementsByClassName('job-card');

    for (i = 0; i < jobCards.length; i++) {
        title = jobCards[i].getAttribute('data-title');
        company = jobCards[i].getAttribute('data-company');
        txtValue = title + " " + company;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            jobCards[i].style.display = "";
        } else {
            jobCards[i].style.display = "none";
        }
    }
}