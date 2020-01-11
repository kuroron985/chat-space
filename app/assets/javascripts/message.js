$(function () {
  function buildHTML(message) {
    if (message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
            <div class="message__info">
              <p class="message__info__talker">
                ${message.user_name}
              </p>
              <p class="message__info__date">
                ${message.created_at}
              </p>
            </div>
            <p class="message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </p>
            <img src=${message.image} >
          </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
            <div class="message__info">
              <p class="message__info__talker">
                ${message.user_name}
              </p>
              <p class="message__info__date">
                ${message.created_at}
              </p>
            </div>
            <p class="message__text">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </p>
          </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.submit-btn').attr('disabled', false);
      $('form')[0].reset();
    })
    .fail(function () {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function () {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function (i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
        }
      })
      .fail(function () {
        alert("自動更新に失敗しました");
      });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});