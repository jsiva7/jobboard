$(function () {

    getlist();

    function getlist() {
        var token = localStorage.getItem("token");
        
        if (token) {
            $.ajax({
                url: "http://localhost:9696/api/jobs/list",
                type: 'GET',
                dataType: 'json',
                headers: {
                    "Authorization": "Bearer " + token
                },
                success: function (result) {
                    var template = "";

                    if (result.record.length > 0) {
                        $("#nojobs").addClass('hidden');
                    } else {
                        $("#nojobs").removeClass('hidden');
                    }

                    $.each(result.record, function (index, item) {
                        var date = new Date(item.CreatedDateTime).toLocaleDateString()
                        template = template + `
                        <div class="single_jobs white-bg d-flex justify-content-between">
                            <div class="jobs_left d-flex align-items-center">
                                <div class="thumb">
                                    <img src="img/svg_icon/5.svg" alt="" />
                                </div>
                                <div class="jobs_conetent">
                                    <a href="#"><h4 style="margin: 0">`+ item.JobTitle + `</h4></a>
                                    <p style="font-size: 15px; font-style: italic; margin: 0px">`+ item.JobDescription + `</p>
                                    <div class="links_locat d-flex align-items-center">
                                        <div class="location">
                                            <p><i class="fa fa-map-marker"></i> `+ item.JobLocation + `</p>
                                        </div>
                                        <div class="location">
                                            <p><i class="fa fa-clock-o"></i> `+ item.JobStatus + `</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jobs_right">
                                <div class="apply_now">
                                    <a href="#" class="boxed-btn3">Apply Now</a>
                                </div>
                                <div class="date">
                                    <p>`+ date + `</p>
                                </div>
                            </div>
                        </div>`
                    });

                    $("#joblist").append(template);
                },
                error: function (xhr, thrownError) {
                    if (xhr.status == 403) {
                        if (confirm('Login?')) {
                            login()
                        } else {
                        }
                    }
                }
            });
        } else {
            if (confirm('Login?')) {
                login()
            } else {
            }
        }

    }

    function login() {
        $.ajax({
            url: "http://localhost:9696/api/token",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                localStorage.setItem('token', result.token);
                getlist();
            },
            error: function (xhr, thrownError) {
                console.log(xhr.status);
            }
        });
    }

    $("#submitBtn").click(function (e) {
        e.preventDefault();

        var title = $("#title").val();
        var location = $("#location").val();
        var desc = $("#desc").val();

        createjob(title, location, desc);
    });

    function createjob(title, location, desc) {
        var token = localStorage.getItem("token");

        var formData = {
            "JobTitle": title,
            "JobLocation": location,
            "JobDescription": desc,
        };

        if (token) {
            $.ajax({
                contentType: "application/json",
                url: "http://localhost:9696/api/jobs/create",
                type: 'POST',
                data: JSON.stringify(formData),
                dataType: 'text',
                headers: {
                    "Authorization": "Bearer " + token
                },
                success: function (result, status, xhr) {
                    console.log(xhr.status);
                    if (xhr.status == 200) {
                        alert("Successfully created job!");
                        window.location.href = '/index.html'
                    }
                },
                error: function (xhr, status, error) {
                    if (xhr.status == 403) {
                        if (confirm('Login?')) {
                            login()
                        } else {
                        }
                    } else if (xhr.status == 422) {
                        var err = JSON.parse(xhr.responseText);
                        alert(err.error);
                    }
                }
            });
        } else {
            if (confirm('Login?')) {
                login()
            } else {
            }
        }

    }
});